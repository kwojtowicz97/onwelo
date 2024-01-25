<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { flattenObject } from '$lib/utils/flattenObject';
	import { convertObjectToCSV, downloadCSV } from '$lib/utils/generateCSV';
	import { convertObjectToJSON, downloadJSON } from '$lib/utils/generateJSON';
	import type { Ebook } from '../../app';

	export let ebooksData: Ebook[];
	export let onlyFormat = false;

	let scope: 'everything' | 'filtered' = 'everything';
	let format: 'json' | 'csv' = 'json';
	let errorMessage: string | undefined;

	const downloadHandler = async () => {
		let dataToDownload = [...ebooksData];
		if (scope === 'everything') {
			const response = await fetch(`${PUBLIC_BACKEND_URL}/ebooks`);
			if (!response.ok) {
				errorMessage = (await response.json()).message || 'Something went wrong. Try again later.';
			} else {
				dataToDownload = await response.json();
			}
		}
		const isCSV = format === 'csv';
		const generator = isCSV ? convertObjectToCSV : convertObjectToJSON;
		const downloader = isCSV ? downloadCSV : downloadJSON;
		const extenstion = isCSV ? '.csv' : '.json';
		const generatedData = generator(
			isCSV ? dataToDownload.map((ebook) => flattenObject(ebook)) : dataToDownload
		);
		downloader(generatedData, 'ebooks' + extenstion);
	};
</script>

<div
	class="modal fade"
	id="downloadModal"
	tabindex="-1"
	aria-labelledby="downloadModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="downloadModalLabel">Download data</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				{#if !onlyFormat}
					<div class="mb-3">
						<label for="scope" class="form-label">Download</label>
						<select bind:value={scope} class="form-select form-select-lg" name="scope" id="scope">
							<option value="everything">Everything</option>
							<option value="filtered">Only flitered</option>
						</select>
					</div>
				{/if}
				<div class="mb-3">
					<label for="scope" class="form-label">Format</label>
					<select bind:value={format} class="form-select form-select-lg" name="scope" id="scope">
						<option value="json">JSON</option>
						<option value="csv">CSV</option>
					</select>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				<button on:click={downloadHandler} type="button" class="btn btn-primary">Download</button>
			</div>
		</div>
	</div>
</div>
