// LeanScale Pre-Kickoff Intake Form - Question Definitions
// Questions are filtered to only include things the CLIENT uniquely knows.
// Anything discoverable via Salesforce audit is excluded (pipelines, fields, stages, automations, data quality).

var FORM_SECTIONS = {
  general: {
    title: "General Intake",
    description: "Help us understand your organization, team, and current tools so we can hit the ground running.",
    groups: [
      {
        heading: "Company Overview",
        fields: [
          { key: "company_hq", label: "Company Headquarters", type: "text", placeholder: "e.g., Zurich, Switzerland" },
          { key: "company_arr", label: "Approximate Annual Revenue", type: "text", placeholder: "e.g., $80M" },
          { key: "company_stage", label: "Company Stage", type: "select", options: ["", "Seed", "Series A", "Series B", "Series C", "Series D+", "Public", "Bootstrapped"] },
          { key: "primary_industry", label: "Primary Industry / Vertical", type: "text", placeholder: "e.g., Smart Data Capture, SaaS, Fintech" },
          { key: "global_regions", label: "Regions Where You Operate", type: "text", placeholder: "e.g., North America, EMEA, Asia-Pacific" },
          { key: "timezone_constraints", label: "Timezone Constraints for Meetings", type: "textarea", placeholder: "e.g., Key stakeholders in Zurich — meetings must be before 1 PM ET" }
        ]
      },
      {
        heading: "Team Structure",
        fields: [
          { key: "ae_count", label: "Number of Account Executives", type: "number" },
          { key: "sdr_bdr_count", label: "Number of SDRs / BDRs", type: "number" },
          { key: "csm_count", label: "Number of CSMs", type: "number" },
          { key: "partner_count", label: "Number of Partner / Channel Reps", type: "number" },
          { key: "revops_count", label: "Number of RevOps / Sales Ops Team Members", type: "number" },
          { key: "sales_managers_count", label: "Number of Sales Managers", type: "number" },
          { key: "sales_motion", label: "Primary Sales Motion", type: "select", options: ["", "Sales-Led (Enterprise)", "Sales-Led (SMB/Mid-Market)", "Product-Led Growth", "Hybrid (PLG + SLG)", "Channel / Partner-Led"] },
          { key: "outbound_motion", label: "Do you have an outbound prospecting motion today?", type: "select", options: ["", "Yes — dedicated SDR/BDR team", "Yes — AEs self-prospect", "No — inbound only", "Planning to build one"] }
        ]
      },
      {
        heading: "Key Stakeholders",
        description: "Who should we be working with? Names, titles, and any context that helps us collaborate effectively.",
        fields: [
          { key: "executive_sponsor", label: "Executive Sponsor (Name, Title)", type: "text", placeholder: "e.g., Tom Karrat, CRO" },
          { key: "executive_sponsor_notes", label: "Executive Sponsor — Anything we should know?", type: "textarea", placeholder: "Communication preferences, availability, priorities..." },
          { key: "revops_lead", label: "RevOps / Sales Ops Lead (Name, Title)", type: "text" },
          { key: "revops_lead_notes", label: "RevOps Lead — Anything we should know?", type: "textarea" },
          { key: "crm_admin", label: "CRM Admin (Name, Title)", type: "text" },
          { key: "crm_admin_notes", label: "CRM Admin — Anything we should know?", type: "textarea" },
          { key: "marketing_leader", label: "Marketing Leader (Name, Title)", type: "text" },
          { key: "sales_leader", label: "Sales Leader (Name, Title)", type: "text" },
          { key: "cs_leader", label: "Customer Success Leader (Name, Title)", type: "text" },
          { key: "it_security_contact", label: "IT / Security Contact (Name, Email)", type: "text" },
          { key: "additional_stakeholders", label: "Other Key Stakeholders", type: "textarea", placeholder: "Anyone else we should loop in? Finance, legal, product..." }
        ]
      },
      {
        heading: "Tech Stack Overview",
        description: "List the GTM tools you use today. We'll get into the details during our project-specific sessions.",
        fields: [
          { key: "crm_platform", label: "CRM Platform", type: "select", options: ["", "Salesforce", "HubSpot", "Microsoft Dynamics", "Other"], required: true },
          { key: "crm_edition", label: "CRM Edition / Tier", type: "text", placeholder: "e.g., Salesforce Enterprise, HubSpot Professional" },
          { key: "marketing_automation", label: "Marketing Automation Platform", type: "text", placeholder: "e.g., Marketo, HubSpot Marketing Hub, Pardot" },
          { key: "sales_engagement", label: "Sales Engagement Platform", type: "text", placeholder: "e.g., Salesloft, Outreach, Gong Engage, Apollo" },
          { key: "conversation_intelligence", label: "Conversation Intelligence", type: "text", placeholder: "e.g., Gong, Chorus, Clari Copilot" },
          { key: "email_platform", label: "Email System (for Sales Team)", type: "select", options: ["", "Google Workspace", "Microsoft 365", "Other"] },
          { key: "video_conferencing", label: "Video Conferencing Platform(s)", type: "text", placeholder: "e.g., Zoom, Microsoft Teams, Google Meet" },
          { key: "phone_dialer", label: "Phone / Dialer System", type: "text", placeholder: "e.g., RingCentral, Aircall, Dialpad, none" },
          { key: "data_enrichment", label: "Data Enrichment Tools", type: "textarea", placeholder: "e.g., ZoomInfo, Clay, Apollo, Lusha, LinkedIn Sales Navigator" },
          { key: "attribution_tool", label: "Attribution / Analytics", type: "text", placeholder: "e.g., HockeyStack, Bizible, Google Analytics" },
          { key: "cs_platform", label: "Customer Success Platform", type: "text", placeholder: "e.g., Gainsight, ChurnZero, Planhat, Vitally" },
          { key: "cpq_tool", label: "CPQ / Quote-to-Cash", type: "text", placeholder: "e.g., DealHub, Salesforce CPQ, PandaDoc" },
          { key: "other_tools", label: "Other GTM Tools", type: "textarea", placeholder: "Anything else in your stack — project management, enablement, commission tracking, etc." }
        ]
      },
      {
        heading: "System Access",
        description: "Confirm the status of system access for the LeanScale team.",
        fields: [
          { key: "nda_status", label: "NDA Executed?", type: "select", options: ["", "Yes", "No", "In Progress"] },
          { key: "crm_access_status", label: "CRM Admin Access Granted?", type: "select", options: ["", "Yes — Production", "Yes — Production + Sandbox", "In Progress", "Not Yet"] },
          { key: "gong_access_status", label: "Gong Access Granted?", type: "select", options: ["", "Yes", "In Progress", "Not Yet", "N/A"] },
          { key: "marketing_auto_access", label: "Marketing Automation Access Granted?", type: "select", options: ["", "Yes", "In Progress", "Not Yet", "N/A"] },
          { key: "other_access_notes", label: "Notes on System Access", type: "textarea", placeholder: "Any blockers, pending approvals, or IT requirements?" }
        ]
      }
    ]
  },

  gtm_lifecycle: {
    title: "GTM Lifecycle",
    description: "These questions help us understand your current go-to-market process and what you want it to look like. We'll audit your CRM configuration directly — these questions focus on how your team actually works.",
    groups: [
      {
        heading: "Current GTM Process",
        fields: [
          { key: "lead_to_sales_handoff", label: "Walk us through what happens when Marketing generates a lead — what is the handoff to Sales today?", type: "textarea", placeholder: "Describe the process from when a lead comes in to when Sales engages..." },
          { key: "mql_definition", label: "Do you have a defined MQL? If so, what are the criteria?", type: "textarea", placeholder: "Is it automated or manual? What triggers MQL status?" },
          { key: "mql_automated", label: "Is MQL qualification automated or manual?", type: "select", options: ["", "Fully automated (lead scoring)", "Partially automated", "Entirely manual", "No MQL definition exists"] },
          { key: "post_closed_won", label: "What happens after a deal closes? How do you track the customer journey post-sale?", type: "textarea", placeholder: "Is there a defined onboarding process? How is customer health tracked?" },
          { key: "lead_scoring_exists", label: "Do you have a lead scoring model in place?", type: "select", options: ["", "Yes — scoring-based", "Yes — action-based triggers", "Partially (informal)", "No"] },
          { key: "shared_stage_definitions", label: "Do Marketing, Sales, and CS share common stage definitions, or does each team define their own?", type: "select", options: ["", "Shared definitions across teams", "Each team has their own", "No formal definitions exist", "Not sure"] }
        ]
      },
      {
        heading: "Sales Process",
        fields: [
          { key: "qualification_methodology", label: "Do you use a formal qualification methodology? (MEDDIC, BANT, SPIN, Challenger, etc.)", type: "text", placeholder: "Name the methodology, or 'none'" },
          { key: "qualification_documented", label: "Is it documented?", type: "select", options: ["", "Yes — fully documented", "Partially documented", "No — it's tribal knowledge", "We don't have one"] },
          { key: "stage_advancement_criteria", label: "What criteria must be met to advance a deal from one stage to the next?", type: "textarea", placeholder: "Describe any rules or requirements for stage progression, or note if none exist." },
          { key: "biggest_lifecycle_fix", label: "If you could fix one thing about your lifecycle stages, what would it be?", type: "textarea" },
          { key: "ideal_reporting", label: "What does good reporting look like to you? What questions do you want your dashboards to answer?", type: "textarea", placeholder: "Pipeline health? Conversion rates? Activity levels? Forecast accuracy?" }
        ]
      },
      {
        heading: "Business Context",
        fields: [
          { key: "lifecycle_trigger", label: "What triggered the decision to fix your GTM lifecycle now?", type: "textarea", placeholder: "e.g., new leadership, broken reporting, upcoming funding round, re-org..." },
          { key: "downstream_projects", label: "Are there other projects waiting on this? (Territory planning, growth model, compensation redesign, etc.)", type: "textarea" },
          { key: "prior_attempts", label: "Have you tried to define or fix your lifecycle stages before? What happened?", type: "textarea", placeholder: "Any past initiatives that didn't stick? What went wrong?" }
        ]
      },
      {
        heading: "Lead Lifecycle Details",
        description: "Help us understand how leads move through your funnel today so we can design the right stage definitions and handoff points.",
        fields: [
          { key: "lead_scoring_details", label: "If you use lead scoring, what does the model look like? What behaviors and attributes are scored, and what threshold triggers MQL?", type: "textarea", placeholder: "e.g., demo request = 50 pts, whitepaper = 10 pts, VP+ title = 20 pts, threshold = 100" },
          { key: "lead_recycle_process", label: "When Sales decides a lead isn't ready, what happens? Is there a formal process to send it back to Marketing for nurture?", type: "textarea", placeholder: "Describe the process, or note if leads just go dark" },
          { key: "sal_sla_preference", label: "How quickly should Sales follow up on a qualified lead? What SLA feels right?", type: "select", options: ["", "Within 1 hour", "Within 4 business hours", "Same business day", "Within 24 hours", "No SLA exists today", "Not sure"] },
          { key: "mql_bypass_sources", label: "Are there lead sources that should skip the normal MQL process and go straight to Sales?", type: "textarea", placeholder: "e.g., inbound demo requests, customer referrals, partner leads, enterprise hand-raisers" },
          { key: "se_involvement", label: "Do Sales Engineers or Solutions Engineers get involved pre-sale? At what point?", type: "textarea", placeholder: "e.g., SE joins after discovery call, SE runs all POV/POC, SE only for enterprise" }
        ]
      },
      {
        heading: "Sales Pipeline Details",
        description: "These questions dig into specific pipeline stages and processes. We've already audited your CRM configuration — this is about how the team actually works.",
        fields: [
          { key: "pov_poc_process", label: "Describe your Proof of Value / POC process. What does a successful POV look like? Are there documented success criteria?", type: "textarea", placeholder: "How long does a typical POV take? Who runs it? What determines success vs. failure?" },
          { key: "verbal_commit_definition", label: "What triggers a 'Verbal Commit' in your process — a verbal yes from the economic buyer, procurement approval, or something else?", type: "textarea", placeholder: "Describe what must be true for a deal to be at this stage" },
          { key: "closed_won_checklist", label: "What must happen for a deal to be marked Closed Won today? Walk us through the actual process.", type: "textarea", placeholder: "Contract signed? Finance notified? CS notified? ARR confirmed? What actually happens vs. what should happen?" },
          { key: "stalled_deal_process", label: "What happens to deals that go quiet? Is there a defined process, or do reps manage it individually? How long before a deal is considered stalled?", type: "textarea" },
          { key: "loss_reason_tracking", label: "When a deal is lost, are reps required to log a reason? Are the current loss reason options useful, or do reps just pick the first one?", type: "textarea", placeholder: "Be honest — we need to know if the data is trustworthy" },
          { key: "billing_stages_usage", label: "Your pipeline includes post-close billing stages (Closed Booked, Billable, Billed). Who uses these and for what? What would break if we moved them out of the sales pipeline?", type: "textarea", placeholder: "Which team depends on these? Is there a separate billing system, or is this all tracked on the Opportunity?" },
          { key: "renewal_workflow_today", label: "How are renewals managed today? Is there a defined process, or does it vary? When does the renewal conversation start relative to contract end?", type: "textarea", placeholder: "Who owns it, when does it start, what stages does it go through?" },
          { key: "expansion_tracking", label: "How are upsell/cross-sell opportunities tracked today — as separate opportunities, informally, or not at all?", type: "select", options: ["", "Separate opportunity with Upsell/Expansion record type", "Same pipeline as new business", "Tracked informally (spreadsheet, Slack, etc.)", "Not tracked", "Other"] },
          { key: "deal_desk_exists", label: "Is there a Deal Desk or order management function? If so, what's their role in the deal process?", type: "textarea", placeholder: "e.g., approves non-standard pricing, generates quotes, manages POs — or 'we don't have one'" }
        ]
      },
      {
        heading: "Customer Lifecycle",
        description: "Your CRM currently has no post-sale lifecycle stages. These questions help us design the customer journey from Closed Won through renewal.",
        fields: [
          { key: "ftv_definition", label: "What does 'First Time to Value' look like for your product? When would you say a customer is truly live and getting value?", type: "textarea", placeholder: "e.g., first production scan, first X transactions, specific use case deployed, customer says 'this is working'" },
          { key: "onboarding_duration", label: "How long does a typical onboarding + implementation take? Does it vary by deal size or use case?", type: "textarea", placeholder: "e.g., 2-4 weeks for SMB, 3-6 months for enterprise, depends on integration complexity" },
          { key: "sales_to_cs_handoff", label: "Is there a formal handoff from Sales to CS today? What does it include?", type: "select", options: ["", "Yes — structured meeting + documented handoff", "Yes — informal meeting only", "Partial — varies by rep", "No — CS figures it out from CRM", "No CS team exists"] },
          { key: "sales_to_cs_handoff_detail", label: "If there is a handoff, what information does CS receive? What's missing?", type: "textarea", placeholder: "e.g., meeting with AE, handoff doc, just the CRM record, nothing formal" },
          { key: "healthscore_method", label: "How is the HealthScore (1-10) currently assigned? Is it manual CSM judgment, formula-based, or tied to product usage data?", type: "select", options: ["", "Manual — CSM sets it based on judgment", "Formula — based on defined inputs", "Product usage data driven", "Mix of manual and automated", "Nobody updates it", "Not sure"] },
          { key: "churn_risk_signals", label: "What signals tell you a customer is at risk of churning? What do CSMs watch for?", type: "textarea", placeholder: "e.g., usage decline, executive sponsor leaves, support tickets spike, competitor mentioned, renewal pushback" },
          { key: "customer_pause_tracking", label: "When a customer pauses implementation (reorg, budget freeze, etc.), how is that tracked today?", type: "textarea", placeholder: "e.g., CSM notes, custom field, not tracked, we just wait" },
          { key: "churn_reasons", label: "When a customer churns, is the reason documented? What are the most common churn reasons you've seen?", type: "textarea", placeholder: "List the top 3-5 reasons customers have left" },
          { key: "churned_customer_reactivation", label: "Has a churned customer ever come back? If so, how was that handled in the CRM?", type: "textarea", placeholder: "New deal? Status change? Ad hoc workaround? Never happened?" },
          { key: "renewal_ownership", label: "Who owns the renewal process — CS, a dedicated Renewals team, Sales, or shared?", type: "select", options: ["", "CS owns end-to-end", "Dedicated Renewals team", "Sales owns renewals", "Shared between CS and Sales", "Nobody owns it formally", "Other"] }
        ]
      },
      {
        heading: "Company Lifecycle & Segmentation",
        description: "Your Account Type field has 20+ values mixing lifecycle, type, and status. These questions help us untangle it and consolidate segmentation.",
        fields: [
          { key: "proposed_tier_2026_status", label: "The 'Proposed Tier 2026' field has 34 values (Strategic, Core, Partner, etc.). What's the status of this initiative? Who owns it? Is it expected to become the official segmentation?", type: "textarea" },
          { key: "segmentation_alignment", label: "How should account segmentation align with the Market Map / ICP project? Should they use the same tier definitions?", type: "select", options: ["", "Yes — same framework", "No — separate frameworks", "Market Map project isn't happening", "Need to discuss", "Not sure"] },
          { key: "legacy_account_type_values", label: "Some Account Type values need migration decisions. For each, tell us if it's still meaningful: Licensee, OEM Partner, Pending Customer, Not a Client, Trial", type: "textarea", placeholder: "e.g., Licensee = still used for X customers, Pending Customer = nobody uses this anymore" },
          { key: "abm_status", label: "Is Account-Based Marketing (ABM) a current motion or a future plan? If current, what triggers account-level targeting?", type: "select", options: ["", "Active ABM program", "Pilot / early stage", "Planned for this year", "Not planned", "Not sure"] },
          { key: "mqa_usage", label: "Is the MQA Status field (Pre-MQA / MQA / Recycle) actively used? What criteria trigger an account to become MQA?", type: "textarea", placeholder: "e.g., firmographic fit + 2 engaged contacts, or nobody uses this field" },
          { key: "partner_lifecycle_feedback", label: "The Partner Engagement Status field (26 values) looks well-structured. Is the partner team happy with it, or are there changes they'd like?", type: "textarea", placeholder: "Leave blank if the partner team isn't involved in this project" },
          { key: "dual_partner_customer", label: "Do you have accounts that are both Partners AND Customers simultaneously? How should that be handled?", type: "select", options: ["", "Yes — common, need both tracked", "Yes — rare edge case", "No — partners and customers are separate", "Not sure"] }
        ]
      },
      {
        heading: "Constraints & Sensitivities",
        description: "Honest answers here save us from stepping on landmines.",
        fields: [
          { key: "political_sensitivities", label: "Are there any fields, stages, or processes that are politically sensitive — things someone senior championed that we should approach carefully?", type: "textarea", placeholder: "This is confidential — it helps us navigate internal dynamics" },
          { key: "intentional_weirdness", label: "Is there anything in the CRM that looks broken but is actually intentional? Anything we should know about before recommending changes?", type: "textarea", placeholder: "e.g., 'that field is weird because legal requires it,' 'Finance insisted on those billing stages'" },
          { key: "hard_deadlines", label: "Are there upcoming events that create hard deadlines? (Board meetings, QBRs, fiscal year transitions, territory realignments)", type: "textarea", placeholder: "Include dates if known" }
        ]
      }
    ]
  },

  gong_engage: {
    title: "Gong Engage / Activity Capture",
    description: "These questions cover your Gong deployment, activity capture strategy, and any sales engagement platform migration. We'll configure the integrations — we need your context on process and compliance.",
    groups: [
      {
        heading: "Gong Deployment Context",
        fields: [
          { key: "gong_license_scope", label: "What Gong products are included in your license?", type: "textarea", placeholder: "e.g., Conversation Intelligence, Engage (cadences/sequences), Forecast, all of the above" },
          { key: "gong_primary_driver", label: "What is the primary driver for deploying Gong?", type: "select", options: ["", "Coaching and rep development", "Deal visibility and inspection", "Competitive intelligence", "CRM data quality / activity logging", "Replacing another tool", "All of the above"] },
          { key: "gong_revenue_outcomes", label: "What specific revenue outcomes are you hoping to impact?", type: "textarea", placeholder: "e.g., win rate, ramp time, forecast accuracy, churn reduction..." },
          { key: "prior_ci_tools", label: "Has the organization used conversation recording or intelligence tools before? What happened?", type: "textarea" },
          { key: "gong_admin_owner", label: "Who will own Gong administration after launch?", type: "text", placeholder: "Name and role" }
        ]
      },
      {
        heading: "Sales Engagement Migration",
        fields: [
          { key: "replacing_salesloft", label: "Are you replacing your current sales engagement platform (e.g., SalesLoft) with Gong Engage?", type: "select", options: ["", "Yes — full replacement", "Partially — some features only", "No — keeping current tool", "Under discussion"] },
          { key: "current_sep_contract_end", label: "Current sales engagement platform contract end date", type: "text", placeholder: "e.g., June 2026, month-to-month, unknown" },
          { key: "sep_workflows_in_use", label: "What workflows are actively being used in your current sales engagement tool?", type: "textarea", placeholder: "Cadences/sequences, templates, automation rules, Drift chatbot, etc." },
          { key: "sep_teams_dependent", label: "Which teams are currently dependent on the existing sales engagement platform?", type: "textarea", placeholder: "e.g., BDRs for inbound routing, AEs for follow-up sequences..." }
        ]
      },
      {
        heading: "Activity & Coaching",
        fields: [
          { key: "current_coaching_process", label: "How do managers currently coach reps? What does a typical coaching session look like?", type: "textarea" },
          { key: "call_channel_mix", label: "What percentage of customer calls are conducted virtually vs. phone vs. in-person?", type: "textarea", placeholder: "e.g., 80% Zoom, 15% phone, 5% in-person" },
          { key: "current_crm_logging", label: "How are reps currently logging call notes and next steps in the CRM? What's the compliance rate?", type: "textarea" },
          { key: "activity_visibility_needs", label: "What level of activity visibility do you need?", type: "select", options: ["", "Just display on records", "Reports and dashboards", "Reports + automation triggers (e.g., no-activity alerts)", "Full analytics and forecasting integration"] },
          { key: "activity_visibility_policy", label: "Who should be able to see whose activities?", type: "select", options: ["", "Open — all managers see all activity", "Restricted — direct managers only", "Custom policy needed", "Haven't decided yet"] },
          { key: "big_brother_concern", label: "How do you expect the team to react to call recording and activity tracking? Any prior pushback?", type: "textarea" }
        ]
      },
      {
        heading: "Compliance & Legal",
        fields: [
          { key: "recording_consent_review", label: "Has legal completed a review of recording consent requirements for your territories?", type: "select", options: ["", "Yes — approved", "In progress", "Not started", "Not sure"] },
          { key: "two_party_consent", label: "Do you sell into two-party consent states or international markets (GDPR)?", type: "select", options: ["", "US only — one-party consent states", "US — mix of one-party and two-party consent states", "International — GDPR applies", "Both US mixed + international"] },
          { key: "data_retention_policy", label: "Are there data retention policies or industry compliance requirements? (HIPAA, SOX, etc.)", type: "textarea" },
          { key: "it_security_requirements", label: "Are there IT/security requirements for new tool adoption? (Security questionnaire, SSO, data residency)", type: "textarea" }
        ]
      },
      {
        heading: "Rollout Planning",
        fields: [
          { key: "gong_rollout_size", label: "How many total users will be on Gong? (Reps, managers, executives)", type: "number" },
          { key: "gong_rollout_phasing", label: "Do you want to roll out to everyone at once, or start with a pilot group?", type: "select", options: ["", "Everyone at once", "Pilot group first, then expand", "Phased by team/region", "No preference — advise us"] },
          { key: "gong_pilot_team", label: "If piloting, which team or group should go first?", type: "text" },
          { key: "gong_executive_champion", label: "Is there executive sponsorship for this rollout? Who is the champion?", type: "text" },
          { key: "team_tool_appetite", label: "What's the team's general appetite for new tools? Have recent tool adoptions succeeded or struggled?", type: "textarea" }
        ]
      }
    ]
  },

  forecasting: {
    title: "Forecasting",
    description: "These questions help us design a forecasting process that fits how your team works. We'll assess data quality and CRM configuration directly — we need your input on methodology and expectations.",
    groups: [
      {
        heading: "Current Forecasting Process",
        fields: [
          { key: "current_forecast_method", label: "How do you forecast today?", type: "select", options: ["", "Spreadsheet roundup (manual)", "CRM native forecasting", "Third-party tool (Clari, Ebsta, etc.)", "Manager gut feel / verbal", "We don't forecast", "Other"] },
          { key: "current_forecast_method_details", label: "Describe your current process in more detail", type: "textarea", placeholder: "Who compiles it? How long does it take? Where does the data come from?" },
          { key: "forecast_categories", label: "What forecast categories do you use, if any? How are they defined?", type: "textarea", placeholder: "e.g., Pipeline, Best Case, Commit, Closed — or describe your current categories" },
          { key: "forecast_submission_cadence", label: "How often do reps submit forecasts?", type: "select", options: ["", "Weekly", "Bi-weekly", "Monthly", "Quarterly", "Ad hoc / no regular cadence", "They don't submit forecasts"] },
          { key: "forecast_accuracy_estimate", label: "What's your estimated forecast accuracy today?", type: "text", placeholder: "e.g., within 10%, wildly off, unknown" },
          { key: "forecast_review_meetings", label: "Do managers currently run forecast review meetings? What format?", type: "textarea", placeholder: "How often, who attends, what data is reviewed?" }
        ]
      },
      {
        heading: "Business Context",
        fields: [
          { key: "forecast_usage", label: "How does leadership currently use forecast data?", type: "textarea", placeholder: "Board reporting, resource allocation, hiring decisions, inventory planning?" },
          { key: "forecast_urgency", label: "What's driving the urgency to fix forecasting now?", type: "textarea", placeholder: "Missed quarter, board pressure, new leadership, funding round?" },
          { key: "forecast_accuracy_target", label: "What does 'good enough' forecast accuracy look like for your business?", type: "select", options: ["", "Within +/- 5%", "Within +/- 10%", "Within +/- 15%", "Just better than today", "Not sure"] },
          { key: "forecast_tools_planned", label: "Are you using or planning to use any forecasting tools?", type: "textarea", placeholder: "e.g., Gong Forecast, Clari, Ebsta, native CRM forecasting" }
        ]
      },
      {
        heading: "Team & Process",
        fields: [
          { key: "forecast_team_size", label: "How many reps and managers will be part of the forecast process?", type: "text", placeholder: "e.g., 24 AEs + 4 managers + VP" },
          { key: "sales_motions_count", label: "How many distinct sales motions do you have?", type: "textarea", placeholder: "e.g., Enterprise, Mid-Market, SMB, Channel — or just one primary motion" },
          { key: "sales_cycle_length", label: "What is your average sales cycle length?", type: "text", placeholder: "e.g., 3-6 months, 30 days, varies by segment" },
          { key: "forecast_tied_to_comp", label: "Is forecast accuracy currently tied to compensation or performance reviews?", type: "select", options: ["", "Yes", "No", "Planning to implement", "Not sure"] },
          { key: "submission_compliance_appetite", label: "Is there appetite to enforce forecast submission compliance?", type: "select", options: ["", "Yes — consequences for non-submission", "Yes — but soft enforcement only", "No — voluntary", "Need to discuss"] },
          { key: "forecast_owner_post_handoff", label: "Who will own the forecast process day-to-day after we hand off?", type: "text", placeholder: "Name and role" }
        ]
      },
      {
        heading: "Historical Data",
        description: "We'll pull CRM data directly. These questions are about data that may live outside your CRM.",
        fields: [
          { key: "historical_forecasts_available", label: "Do you have historical forecast submissions we can use for baselining?", type: "select", options: ["", "Yes — in CRM", "Yes — in spreadsheets", "Yes — in email / Slack", "No historical data", "Not sure"] },
          { key: "historical_forecasts_location", label: "Where can we find them?", type: "textarea", placeholder: "Link to spreadsheet, folder, or describe where they are" },
          { key: "actual_revenue_data", label: "Can you provide actual revenue by period for accuracy baselining?", type: "select", options: ["", "Yes — from CRM", "Yes — from finance team", "Need to request from finance", "Not sure"] },
          { key: "planned_reorg", label: "Are there any planned team changes or reorgs in the next 90 days?", type: "textarea", placeholder: "New hires, role transitions, territory changes, team restructuring?" },
          { key: "non_negotiable_requirements", label: "Are there non-negotiable requirements for the forecast process?", type: "textarea", placeholder: "Specific tools, board reporting format, category names, etc." }
        ]
      }
    ]
  }
};
