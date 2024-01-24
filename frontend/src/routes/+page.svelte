<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	let isLoadind = false;

	const submitHandler = async (event: Event) => {
		isLoadind = true;
		try {
			event.preventDefault();
			const file = (event.target as HTMLFormElement).file.files[0];
			const formData = new FormData();
			formData.append('file', file);
			const response = await fetch(`${PUBLIC_BACKEND_URL}/upload`, {
				method: 'POST',
				body: formData
			});
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		} finally {
			isLoadind = false;
		}
	};
</script>

<div class="d-flex justify-content-center mt-5">
	<form on:submit={submitHandler} class="w-50">
		<label for="" class="form-label">Select file</label>
		<input
			type="file"
			class="form-control"
			name="file"
			id="file"
			placeholder=""
			aria-describedby="fileHelpId"
			accept=".csv"
		/>
		<div id="fileHelpId" class="form-text">
			Select .csv file with ebooks titles and authors to get prices.
		</div>
		<button type="submit" class="btn btn-primary mt-3"> Button </button>
	</form>
</div>
