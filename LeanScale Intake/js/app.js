// LeanScale Pre-Kickoff Intake — Client App
// Supabase-backed auto-save form with tab navigation and progress tracking

const SUPABASE_URL = 'https://sjzicmksdzomjvjzmrhc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqemljbWtzZHpvbWp2anptcmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMzA1ODksImV4cCI6MjA4OTYwNjU4OX0.TvZj9_qIOonKqUnDpexJXvYXXTOC3MFwm5AS3xgSjQo';

let sb;
try {
  sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch (e) {
  console.error('Supabase init failed:', e);
}

// ── State ──
let clientId = null;
let clientData = null;
let currentTab = 0;
let responses = {};   // { sectionKey: { fieldKey: value } }
let saveTimeout = null;
let sectionKeys = Object.keys(FORM_SECTIONS); // will be filtered per client
let prefilled = {};  // { sectionKey: { fieldKey: value } } — fields we already know

// ── Init ──
document.addEventListener('DOMContentLoaded', init);

async function init() {
  const token = new URLSearchParams(window.location.search).get('token');
  if (!token || !sb) return showError();

  // Look up client by token
  const { data: client, error } = await sb
    .from('clients')
    .select('*')
    .eq('token', token)
    .single();

  if (error || !client) return showError();

  clientId = client.id;
  clientData = client;

  // Filter sections to only those configured for this client
  if (client.sections && Array.isArray(client.sections)) {
    sectionKeys = client.sections.filter(k => FORM_SECTIONS[k]);
  }

  // Load existing responses and prefilled data
  const { data: rows } = await sb
    .from('form_responses')
    .select('section, responses, prefilled')
    .eq('client_id', clientId);

  if (rows) {
    rows.forEach(r => {
      responses[r.section] = r.responses || {};
      if (r.prefilled) prefilled[r.section] = r.prefilled;
    });
  }

  render();
}

function showError() {
  const app = document.getElementById('app');
  app.innerHTML = document.getElementById('tpl-error').innerHTML;
}

// ── Render ──
function render() {
  const app = document.getElementById('app');
  app.innerHTML = document.getElementById('tpl-form').innerHTML;

  // Client name in header
  if (clientData.client_name) {
    const nameEl = document.getElementById('client-name');
    nameEl.textContent = clientData.client_name;
    nameEl.style.display = '';
    document.getElementById('logo-divider').style.display = '';
  }

  renderTabs();
  renderPanel(currentTab);
  updateNavButtons();
  updateOverallProgress();

  // Nav button listeners
  document.getElementById('btn-prev').addEventListener('click', () => switchTab(currentTab - 1));
  document.getElementById('btn-next').addEventListener('click', () => {
    if (currentTab < sectionKeys.length - 1) {
      switchTab(currentTab + 1);
    }
  });
}

function renderTabs() {
  const nav = document.getElementById('tab-nav');
  nav.innerHTML = sectionKeys.map((key, i) => {
    const section = FORM_SECTIONS[key];
    const pct = calcSectionProgress(key);
    return `<button class="tab-btn${i === currentTab ? ' active' : ''}" data-index="${i}">
      ${section.title}
      <span class="tab-progress">${pct}%</span>
    </button>`;
  }).join('');

  nav.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(parseInt(btn.dataset.index)));
  });
}

function switchTab(index) {
  if (index < 0 || index >= sectionKeys.length) return;
  currentTab = index;
  renderTabs();
  renderPanel(currentTab);
  updateNavButtons();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavButtons() {
  const prev = document.getElementById('btn-prev');
  const next = document.getElementById('btn-next');
  prev.style.display = currentTab === 0 ? 'none' : '';

  if (currentTab === sectionKeys.length - 1) {
    next.innerHTML = `Submit <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
    next.onclick = handleSubmit;
  } else {
    next.innerHTML = `Next <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;
    next.onclick = () => switchTab(currentTab + 1);
  }
}

function renderPanel(index) {
  const main = document.getElementById('main-content');
  const key = sectionKeys[index];
  const section = FORM_SECTIONS[key];
  const sectionResponses = responses[key] || {};

  let html = `<div class="tab-panel active">
    <div class="section-header">
      <h1 class="section-title">${section.title}</h1>
      <p class="section-description">${section.description}</p>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar-label">
        <span>Section Progress</span>
        <span>${calcSectionProgress(key)}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width:${calcSectionProgress(key)}%"></div>
      </div>
    </div>`;

  section.groups.forEach(group => {
    html += `<div class="form-group">
      <h2 class="group-heading">${group.heading}</h2>`;
    if (group.description) {
      html += `<p class="group-description">${group.description}</p>`;
    }

    const sectionPrefilled = prefilled[key] || {};
    group.fields.forEach(field => {
      // Skip fields that LeanScale has already prefilled
      if (sectionPrefilled[field.key]) return;

      const val = sectionResponses[field.key] || '';
      html += `<div class="field">
        <label class="field-label" for="f-${field.key}">
          ${field.label}${field.required ? ' <span class="required">*</span>' : ''}
        </label>
        ${renderField(field, val)}
      </div>`;
    });

    html += `</div>`;
  });

  html += `</div>`;
  main.innerHTML = html;

  // Attach auto-save listeners
  main.querySelectorAll('input, textarea, select').forEach(el => {
    el.addEventListener('blur', () => onFieldChange(key, el));
    if (el.tagName === 'SELECT') {
      el.addEventListener('change', () => onFieldChange(key, el));
    }
  });
}

function renderField(field, value) {
  const esc = v => v.replace(/"/g, '&quot;').replace(/</g, '&lt;');

  switch (field.type) {
    case 'textarea':
      return `<textarea id="f-${field.key}" placeholder="${esc(field.placeholder || '')}" rows="3">${esc(value)}</textarea>`;
    case 'select':
      return `<select id="f-${field.key}">
        ${(field.options || []).map(opt =>
          `<option value="${esc(opt)}"${opt === value ? ' selected' : ''}>${opt || '— Select —'}</option>`
        ).join('')}
      </select>`;
    case 'number':
      return `<input type="number" id="f-${field.key}" value="${esc(value)}" placeholder="${esc(field.placeholder || '')}">`;
    case 'email':
      return `<input type="email" id="f-${field.key}" value="${esc(value)}" placeholder="${esc(field.placeholder || '')}">`;
    default:
      return `<input type="text" id="f-${field.key}" value="${esc(value)}" placeholder="${esc(field.placeholder || '')}">`;
  }
}

// ── Auto-save ──
function onFieldChange(sectionKey, el) {
  const fieldKey = el.id.replace('f-', '');
  if (!responses[sectionKey]) responses[sectionKey] = {};
  responses[sectionKey][fieldKey] = el.value;

  // Debounce save
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => saveSection(sectionKey), 500);

  // Update progress displays
  renderTabs();
  updateSectionProgress(sectionKey);
  updateOverallProgress();
}

async function saveSection(sectionKey) {
  const sectionResponses = responses[sectionKey] || {};
  const pct = calcSectionProgress(sectionKey);

  const { error } = await sb
    .from('form_responses')
    .upsert({
      client_id: clientId,
      section: sectionKey,
      responses: sectionResponses,
      progress_pct: pct,
      updated_at: new Date().toISOString()
    }, { onConflict: 'client_id,section' });

  if (!error) flashSaveStatus();
}

function flashSaveStatus() {
  const el = document.getElementById('save-status');
  if (!el) return;
  el.classList.add('visible');
  setTimeout(() => el.classList.remove('visible'), 2000);
}

// ── Progress ──
function calcSectionProgress(sectionKey) {
  const section = FORM_SECTIONS[sectionKey];
  const sectionResponses = responses[sectionKey] || {};
  const sectionPrefilled = prefilled[sectionKey] || {};
  let total = 0, filled = 0;

  section.groups.forEach(group => {
    group.fields.forEach(field => {
      // Exclude prefilled fields from client-facing progress
      if (sectionPrefilled[field.key]) return;
      total++;
      if (sectionResponses[field.key] && sectionResponses[field.key].trim() !== '') filled++;
    });
  });

  return total === 0 ? 100 : Math.round((filled / total) * 100);
}

function updateSectionProgress(sectionKey) {
  // Re-render the section progress bar in the current panel
  const pct = calcSectionProgress(sectionKey);
  const container = document.querySelector('.tab-panel .progress-bar-container');
  if (container) {
    container.querySelector('.progress-bar-fill').style.width = pct + '%';
    container.querySelector('.progress-bar-label span:last-child').textContent = pct + '%';
  }
}

function updateOverallProgress() {
  let totalFields = 0, filledFields = 0;
  sectionKeys.forEach(key => {
    const section = FORM_SECTIONS[key];
    const sectionResponses = responses[key] || {};
    section.groups.forEach(group => {
      group.fields.forEach(field => {
        totalFields++;
        if (sectionResponses[field.key] && sectionResponses[field.key].trim() !== '') filledFields++;
      });
    });
  });
  const pct = totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);
  const pctEl = document.getElementById('overall-progress-pct');
  const fillEl = document.getElementById('overall-progress-fill');
  if (pctEl) pctEl.textContent = pct + '%';
  if (fillEl) fillEl.style.width = pct + '%';
}

// ── Submit ──
async function handleSubmit() {
  // Save all sections first
  for (const key of sectionKeys) {
    await saveSection(key);
  }
  alert('Thank you! Your responses have been saved. Your LeanScale team will follow up with next steps.');
}
