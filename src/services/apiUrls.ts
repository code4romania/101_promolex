export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const apiPaths = {
  currentLegislatureId: `${API_BASE_URL}?type=current_legislature_id`,
  currentLegislatureDetails: `${API_BASE_URL}?type=legislature_details_by_id&lid=`,
  factionsListByLegislatureId: `${API_BASE_URL}?type=list_factions_by_legislature_id&lid=`,
  deputiesListByLegislatureId: `${API_BASE_URL}?type=list_deputies_by_legislature_id&lid=`,
  deputiesListByFactionId: `${API_BASE_URL}?type=list_deputies_by_faction_id&fid=`,
  deputyDetailsById: `${API_BASE_URL}?type=deputies_details_by_deputie_id&did=`,
  statementYear: `${API_BASE_URL}?type=default_statement_year`,
  legislationInitiativesByDeputyId: `${API_BASE_URL}?type=deputie_author_details&did=`,
  legislationInitiativeDetailsById: `${API_BASE_URL}?type=document_details&docid=`,
  incomeStatementsByDeputyId: (did: string, year: string) =>
    `${API_BASE_URL}?type=deputie_income_statement&did=${did}&year=${year}`,
  registeredProjectsByFilters: `${API_BASE_URL}?type=list_registered_projects`,
  committeesListByLegislatureId: `${API_BASE_URL}?type=list_committees_by_lid&lid=`,
  deputiesListByCommitteeId: `${API_BASE_URL}?type=list_deputies_by_committee_id&committee=`,
  registeredProjectsStatistics: `${API_BASE_URL}?type=registered_projects_statistics`,
  reportsList: `${API_BASE_URL}?type=get_reports`,
  reportDetails: `${API_BASE_URL}?type=get_report_details&rid=`,
  eventsList: `${API_BASE_URL}?type=get_events`,
  eventDetails: `${API_BASE_URL}?type=get_event_details&eid=`,
  sessionsListByLegislatureId: `${API_BASE_URL}?type=get_sessions_list&lid=`,
  liveSession: `${API_BASE_URL}?type=get_live_session`,
  committeesMainReporterData: `${API_BASE_URL}?type=committee_main_reporter_data&lid=`,
  committeesMainReporterCoreporterData: `${API_BASE_URL}?type=committee_main_reporter_coreporter_data&lid=`,
  committeesNotices: `${API_BASE_URL}?type=committee_notices&lid=`,
  committeeDetails: `${API_BASE_URL}?type=committee_detail_by_id&committee=`,
  sendVote: `${API_BASE_URL}?type=insert_vote`,
  voteResults: `${API_BASE_URL}?type=show_votes_result`,
  sendQuestion: `${API_BASE_URL}?type=insert_question`,
  committeeQuestions: `${API_BASE_URL}?type=get_pc_questions&lid=`,
  committeeInterpellations: `${API_BASE_URL}?type=get_pc_interpelations&lid=`,
  committeeExPostEvaluation: `${API_BASE_URL}?type=get_pc_ex_post_evaluations`,
  committeeExPostEvaluationYears: `${API_BASE_URL}?type=get_pc_ex_post_evaluations_years`,
  committeeInstitutionReports: `${API_BASE_URL}?type=get_pc_institutions_reports&lid=`,
  committeeInstitutionHearings: `${API_BASE_URL}?type=get_pc_institutions_hearings&lid=`,
  committeeHearingReports: `${API_BASE_URL}?type=get_pc_hearings_reports&lid=`,
  committeeSpecialCommissions: `${API_BASE_URL}?type=get_pc_special_comissions&lid=`,
  committeeInvestigationCommissions: `${API_BASE_URL}?type=get_pc_investigate_comissions&lid=`,
  committeeMotions: `${API_BASE_URL}?type=get_motions`,
  deputyQuestions: `${API_BASE_URL}?type=deputie_questions_interpelations&did=`,
  committeeReportsYears: `${API_BASE_URL}?type=get_pc_reports_years`,
  deputyIncomeStatementYears: `${API_BASE_URL}?type=get_deputie_income_statement_years&did=`,
  answeredQuestions: `${API_BASE_URL}?type=get_questions`,
};
