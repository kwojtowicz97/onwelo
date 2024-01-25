<script lang="ts">
	import DownloadModal from '$lib/components/DownloadModal.svelte';
	import EbooksFilters from '$lib/components/EbooksFilters.svelte';
	import EbooksTable from '$lib/components/EbooksTable.svelte';
	import type { UploadResponseDto } from '$lib/dtos/uploadResponse.js';

	export let data;
	const tableData: UploadResponseDto = {
		ebooks: data.ebooksData.map((ebook) => ({
			...ebook
		})),
		errors: []
	};
</script>

<div class="row mt-5">
	<div class="col">
		<h1>Browse ebooks</h1>
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
<EbooksFilters />
<EbooksTable data={tableData} />
<DownloadModal ebooksData={data.ebooksData} />
