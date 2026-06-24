// LeanScale Intake — Admin Panel
// Password-gated client management, response viewing, CSV export

var SUPABASE_URL = 'https://sjzicmksdzomjvjzmrhc.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqemljbWtzZHpvbWp2anptcmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMzA1ODksImV4cCI6MjA4OTYwNjU4OX0.TvZj9_qIOonKqUnDpexJXvYXXTOC3MFwm5AS3xgSjQo';

// This script is loaded dynamically AFTER successful authentication
var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auto-launch admin panel
renderAdmin();

async function renderAdmin() {
  const app = document.getElementById('admin-app');
  app.innerHTML = document.getElementById('tpl-admin').innerHTML;

  // Modal controls
  document.getElementById('btn-new-client').addEventListener('click', () => {
    document.getElementById('modal-new').style.display = 'flex';
  });
  document.getElementById('modal-cancel').addEventListener('click', closeModal);
  document.getElementById('modal-create').addEventListener('click', createClient);

  // Close modal on overlay click
  document.getElementById('modal-new').addEventListener('click', e => {
    if (e.target.id === 'modal-new') closeModal();
  });

  // Render section checkboxes
  const cbContainer = document.getElementById('section-checkboxes');
  cbContainer.innerHTML = Object.keys(FORM_SECTIONS).map(key => {
    const section = FORM_SECTIONS[key];
    return `<label style="display:block;margin-bottom:0.4rem;font-size:0.85rem;cursor:pointer;">
      <input type="checkbox" class="section-cb" value="${key}" checked style="margin-right:0.5rem;">
      ${esc(section.title)}
    </label>`;
  }).join('');

  await loadClients();
}

function closeModal() {
  document.getElementById('modal-new').style.display = 'none';
  document.getElementById('new-client-name').value = '';
  document.getElementById('new-client-logo').value = '';
}

async function createClient() {
  const name = document.getElementById('new-client-name').value.trim();
  const logo = document.getElementById('new-client-logo').value.trim();

  if (!name) return alert('Client name is required');

  const selectedSections = Array.from(document.querySelectorAll('.section-cb:checked')).map(cb => cb.value);
  if (selectedSections.length === 0) return alert('Select at least one section');

  const { data, error } = await supabase
    .from('clients')
    .insert({ client_name: name, client_logo_url: logo || null, sections: selectedSections })
    .select()
    .single();

  if (error) return alert('Error creating client: ' + error.message);

  closeModal();
  await loadClients();
}

async function loadClients() {
  const { data: clients, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return;

  // Load progress for all clients
  const { data: allResponses } = await supabase
    .from('form_responses')
    .select('client_id, section, progress_pct');

  const progressMap = {};
  if (allResponses) {
    allResponses.forEach(r => {
      if (!progressMap[r.client_id]) progressMap[r.client_id] = {};
      progressMap[r.client_id][r.section] = r.progress_pct;
    });
  }

  const tbody = document.getElementById('client-tbody');
  tbody.innerHTML = clients.map(c => {
    const sectionPcts = progressMap[c.id] || {};
    const sectionKeys = Object.keys(FORM_SECTIONS);
    const avgPct = sectionKeys.length === 0 ? 0 :
      Math.round(sectionKeys.reduce((sum, k) => sum + (sectionPcts[k] || 0), 0) / sectionKeys.length);

    const formUrl = `${window.location.origin}/index.html?token=${c.token}`;
    const created = new Date(c.created_at).toLocaleDateString();

    return `<tr>
      <td><strong>${esc(c.client_name)}</strong></td>
      <td>${created}</td>
      <td class="progress-cell">${avgPct}%</td>
      <td>
        <button class="btn" onclick="copyLink('${c.token}')">Copy Link</button>
        <button class="btn" onclick="viewResponses('${c.id}')">View</button>
        <button class="btn" onclick="exportCSV('${c.id}', '${esc(c.client_name)}')">Export CSV</button>
      </td>
    </tr>`;
  }).join('');
}

function copyLink(token) {
  const url = `${window.location.origin}/index.html?token=${token}`;
  navigator.clipboard.writeText(url).then(() => {
    alert('Link copied to clipboard!');
  });
}

async function viewResponses(clientId) {
  const { data: rows } = await supabase
    .from('form_responses')
    .select('section, responses, prefilled')
    .eq('client_id', clientId);

  const responseMap = {};
  const prefilledMap = {};
  if (rows) rows.forEach(r => {
    responseMap[r.section] = r.responses || {};
    prefilledMap[r.section] = r.prefilled || {};
  });

  const viewer = document.getElementById('response-viewer');
  let html = '<div class="response-viewer">';

  Object.keys(FORM_SECTIONS).forEach(sectionKey => {
    const section = FORM_SECTIONS[sectionKey];
    const sectionResponses = responseMap[sectionKey] || {};
    const sectionPrefilled = prefilledMap[sectionKey] || {};

    html += `<div class="response-section"><h3>${section.title}</h3>`;
    section.groups.forEach(group => {
      group.fields.forEach(field => {
        const pre = sectionPrefilled[field.key];
        const val = sectionResponses[field.key] || '';
        const displayVal = pre || val;
        const source = pre ? ' <span style="color:var(--accent);font-size:0.7rem;margin-left:0.5rem;">PREFILLED</span>' : '';
        html += `<div class="response-item">
          <div class="response-label">${esc(field.label)}${source}</div>
          <div class="response-value${displayVal ? '' : ' empty'}">${displayVal ? esc(displayVal) : 'Not answered'}</div>
        </div>`;
      });
    });
    html += '</div>';
  });

  html += '</div>';
  viewer.innerHTML = html;
  viewer.scrollIntoView({ behavior: 'smooth' });
}

async function exportCSV(clientId, clientName) {
  const { data: rows } = await supabase
    .from('form_responses')
    .select('section, responses, prefilled')
    .eq('client_id', clientId);

  const responseMap = {};
  const prefilledMap = {};
  if (rows) rows.forEach(r => {
    responseMap[r.section] = r.responses || {};
    prefilledMap[r.section] = r.prefilled || {};
  });

  let csv = 'Section,Group,Question,Answer,Source\n';

  Object.keys(FORM_SECTIONS).forEach(sectionKey => {
    const section = FORM_SECTIONS[sectionKey];
    const sectionResponses = responseMap[sectionKey] || {};
    const sectionPrefilled = prefilledMap[sectionKey] || {};

    section.groups.forEach(group => {
      group.fields.forEach(field => {
        const pre = sectionPrefilled[field.key];
        const val = pre || sectionResponses[field.key] || '';
        const source = pre ? 'Prefilled' : (sectionResponses[field.key] ? 'Client' : '');
        csv += `"${csvEsc(section.title)}","${csvEsc(group.heading)}","${csvEsc(field.label)}","${csvEsc(val)}","${source}"\n`;
      });
    });
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${clientName}-intake-responses.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function esc(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

function csvEsc(s) {
  return s.replace(/"/g, '""');
}
