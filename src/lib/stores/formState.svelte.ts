type ProjectType = 'residential' | 'commercial' | null;

function createFormState() {
	let open = $state(false);
	let preselectedType = $state<ProjectType>(null);

	function openForm(type?: 'residential' | 'commercial') {
		preselectedType = type ?? null;
		open = true;
	}

	function closeForm() {
		open = false;
		preselectedType = null;
	}

	function toggleForm(type?: 'residential' | 'commercial') {
		if (open) {
			closeForm();
		} else {
			openForm(type);
		}
	}

	return {
		get isOpen() {
			return open;
		},
		get preselectedType() {
			return preselectedType;
		},
		open: openForm,
		close: closeForm,
		toggle: toggleForm
	};
}

export const formState = createFormState();
