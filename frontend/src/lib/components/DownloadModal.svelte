<script lang="ts">
	import { convertObjectToCSV, downloadCSV } from '$lib/utils/generateCSV';
	import { convertObjectToJSON, downloadJSON } from '$lib/utils/generateJSON';
	import type { Ebook } from '../../app';

	export let ebooksData: Ebook[];

	let scope: 'everything' | 'filtered' = 'everything';
	let format: 'json' | 'csv' = 'json';

	const downloadHandler = () => {
		const isCSV = format === 'csv';
		const generator = isCSV ? convertObjectToCSV : convertObjectToJSON;
		const downloader = isCSV ? downloadCSV : downloadJSON;
		const extenstion = isCSV ? '.csv' : '.json';
		const generatedData = generator(ebooksData);
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
				<div class="mb-3">
					<label for="scope" class="form-label">Download</label>
					<select bind:value={scope} class="form-select form-select-lg" name="scope" id="scope">
						<option value="everything">Everything</option>
						<option value="filtered">Only flitered</option>
					</select>
				</div>
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
