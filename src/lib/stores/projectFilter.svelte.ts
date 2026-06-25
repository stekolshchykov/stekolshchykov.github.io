export type ProjectFilter = 'all' | 'residential' | 'commercial';

const PAGE_SIZE = 6;

function createProjectFilter() {
	let active = $state<ProjectFilter>('all');
	let loadedCount = $state(PAGE_SIZE);

	function setFilter(filter: ProjectFilter) {
		active = filter;
		loadedCount = PAGE_SIZE;
	}

	function loadMore(amount = PAGE_SIZE) {
		loadedCount += amount;
	}

	function reset() {
		active = 'all';
		loadedCount = PAGE_SIZE;
	}

	return {
		get active() {
			return active;
		},
		get loadedCount() {
			return loadedCount;
		},
		setFilter,
		loadMore,
		reset
	};
}

export const projectFilter = createProjectFilter();
