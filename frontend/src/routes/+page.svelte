<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import DownloadModal from '$lib/components/DownloadModal.svelte';
	import EbooksTable from '$lib/components/EbooksTable.svelte';
	import type { UploadResponseDto } from '$lib/dtos/uploadResponse';

	let isLoadind = false;
	let data: UploadResponseDto | null = null;
	let file: File | null;

	const submitHandler = async (event: Event) => {
		isLoadind = true;
		try {
			event.preventDefault();
			const file = (event.target as HTMLFormElement).file.files[0];
			const formData = new FormData();
			formData.append('file', file);
			const response = await fetch(`${PUBLIC_BACKEND_URL}/ebooks`, {
				method: 'POST',
				body: formData
			});
			data = await response.json();
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
				bind:value={file}
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
			<button disabled={isLoadind || !file} type="submit" class="btn btn-primary mt-3 text-center">
				{#if isLoadind}
					<div class="spinner-border spinner-border-sm" role="status"></div>
				{/if}
				Submit
			</button>
		</form>
	</div>
{:else}
	<div class="row mt-5">
		<div class="col">
			<h1>Results ({data.ebooks.length})</h1>
		</div>
		<div class="col">
			<button
				type="button"
				class="btn btn-primary float-end"
				data-bs-toggle="modal"
				data-bs-target="#downloadModal"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-box-arrow-down"
					viewBox="0 0 16 16"
				>
					<path
						fill-rule="evenodd"
						d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1z"
					/>
					<path
						fill-rule="evenodd"
						d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"
					/>
				</svg> Download
			</button>
		</div>
	</div>
	<EbooksTable {data} />

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
	<DownloadModal ebooksData={data.ebooks} onlyFormat />
{/if}
