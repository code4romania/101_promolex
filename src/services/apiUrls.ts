export const API_BASE_URL = 'https://monitor.md/101/api/post/view.php';

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
};
