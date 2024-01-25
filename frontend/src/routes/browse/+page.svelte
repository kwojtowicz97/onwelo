<script lang="ts">
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

<h1 class="mt-5">Browse ebooks</h1>
<EbooksFilters />
<EbooksTable data={tableData} />
