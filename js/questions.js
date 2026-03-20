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
