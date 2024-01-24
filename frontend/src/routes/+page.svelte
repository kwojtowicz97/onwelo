<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import EbooksTable from '$lib/components/EbooksTable.svelte';
	import type { UploadResponseDto } from '$lib/dtos/uploadResponse';

	let isLoadind = false;
	let data: UploadResponseDto | null = null;

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
			data = await response.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		} finally {
			isLoadind = false;
		}
	};
</script>

{#if !data}
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
				disabled={isLoadind}
			/>
			<div id="fileHelpId" class="form-text">
				Select .csv file with ebooks titles and authors to get prices.
			</div>
			<button disabled={isLoadind} type="submit" class="btn btn-primary mt-3 text-center">
				{#if isLoadind}
					<div class="spinner-border spinner-border-sm" role="status"></div>
				{/if}
				Button
			</button>
		</form>
	</div>
{:else}
	<h1 class="mt-5">Results ({data.ebooks.length})</h1>
	<div class="table-responsive">
		<EbooksTable {data} />
	</div>

	<h1 class="mt-5">Problems ({data.errors.length})</h1>
	<div class="table-responsive">
		<table class="table table-striped table-bordered">
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Title</th>
					<th scope="col">Error</th>
				</tr>
			</thead>
			<tbody>
				{#each data.errors as row}
					<tr class="">
						<td>{row.author}</td>
						<td>{row.title}</td>
						<td>{row.error}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
