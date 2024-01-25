<script lang="ts">
	import type { UploadResponseDto } from '$lib/dtos/uploadResponse';
	export let data: UploadResponseDto;

	const dateOptions: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
</script>

<div class="table-responsive">
	<table class="table table-striped table-bordered mt-2">
		<thead>
			<tr>
				<th scope="col">Name</th>
				<th scope="col">Title</th>
				<th scope="col">Currency</th>
				<th scope="col">Price (USD)</th>
				<th scope="col">Date</th>
				<th scope="col">Rate</th>
				<th scope="col">Price (PLN)</th>
				<th scope="col">Table no.</th>
			</tr>
		</thead>
		<tbody>
			{#each data.ebooks as row}
				<tr class="">
					<td>{row.name}</td>
					<td>{row.title}</td>
					<td>{row.curr}</td>
					<td>{row.price ? `$${row.price}` : 'Free'}</td>
					<td>{new Date(row.relaseDate).toLocaleDateString('en-US', dateOptions)}</td>
					<td>{row.fromNBP?.rate || '-'}</td>
					<td>{row.fromNBP?.pricePLN ? `${row.fromNBP.pricePLN.toFixed(2)}zł` : 'Free'}</td>
					<td>{row.fromNBP?.tableNo || '-'}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
