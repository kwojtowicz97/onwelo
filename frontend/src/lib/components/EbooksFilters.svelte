<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';

	const searchParams = $page.url.searchParams;

	let name = searchParams.get('name') || undefined;
	let title = searchParams.get('title') || undefined;

	const priceusd = searchParams.get('priceusd')?.split(',');
	let priceMinUsd = priceusd?.at(0) ? priceusd[0] : undefined;
	let priceMaxUsd = priceusd?.at(1) ? priceusd[1] : undefined;

	const pricepln = searchParams.get('pricepln')?.split(',');
	let priceMinPln = pricepln?.at(0) ? pricepln[0] : undefined;
	let priceMaxPln = pricepln?.at(1) ? pricepln[1] : undefined;

	const date = searchParams.get('date')?.split(',');

	let dateMin: string | undefined =
		date && date[0] ? new Date(+date[0]).toISOString().split('T')[0] : undefined;
	let dateMax: string | undefined =
		date && date[1] ? new Date(+date[1]).toISOString().split('T')[0] : undefined;

	const submitHandler = async (e: Event) => {
		e.preventDefault();
		const searchParams = $page.url.searchParams;
		if (name) {
			searchParams.set('name', name);
		}
		if (title) {
			searchParams.set('title', title);
		}
		if (priceMinUsd || priceMaxUsd) {
			searchParams.set(
				'priceusd',
				`${priceMinUsd ? priceMinUsd : ''},${priceMaxUsd ? priceMaxUsd : ''}`
			);
		}
		if (priceMinPln || priceMaxPln) {
			searchParams.set(
				'pricepln',
				`${priceMinPln ? priceMinPln : ''},${priceMaxPln ? priceMaxPln : ''}`
			);
		}
		if (dateMin || dateMax) {
			searchParams.set(
				'date',
				`${dateMin ? new Date(dateMin).getTime() : ''},${dateMax ? new Date(dateMax).getTime() : ''}`
			);
		}
		invalidate('browse:filters');
		await goto(`?${searchParams.toString()}`);
	};
</script>

<p>
	<button
		class="btn btn-secondary"
		type="button"
		data-bs-toggle="collapse"
		data-bs-target="#collapseExample"
		aria-expanded="false"
		aria-controls="collapseExample"
	>
		Show filters
	</button>
</p>
<div class="collapse" id="collapseExample">
	<div class="card card-body">
		<form on:submit={submitHandler} class="row g-3">
			<div class="col-md-6">
				<label for="name" class="form-label">Name</label>
				<input
					bind:value={name}
					type="text"
					class="form-control"
					id="name"
					placeholder="Enter name"
				/>
			</div>
			<div class="col-md-6">
				<label for="title" class="form-label">Title</label>
				<input
					bind:value={title}
					type="text"
					class="form-control"
					id="title"
					placeholder="Enter title"
				/>
			</div>
			<div class="col-md-6">
				<label for="price-min-usd" class="form-label">Price min (USD)</label>
				<input
					bind:value={priceMinUsd}
					type="number"
					class="form-control"
					id="price-min-usd"
					placeholder="Enter min price (USD)"
				/>
			</div>
			<div class="col-md-6">
				<label for="price-max-usd" class="form-label">Price max (USD)</label>
				<input
					bind:value={priceMaxUsd}
					type="number"
					class="form-control"
					id="price-max-usd"
					placeholder="Enter max price (USD)"
				/>
			</div>
			<div class="col-md-6">
				<label for="price-min-pln" class="form-label">Price min (PLN)</label>
				<input
					bind:value={priceMinPln}
					type="number"
					class="form-control"
					id="price-min-pln"
					placeholder="Enter min price (PLN)"
				/>
			</div>
			<div class="col-md-6">
				<label for="price-max-pln" class="form-label">Price max (PLN)</label>
				<input
					bind:value={priceMaxPln}
					type="number"
					class="form-control"
					id="price-max-pln"
					placeholder="Enter max price (PLN)"
				/>
			</div>
			<div class="col-md-6">
				<label for="date-min" class="form-label">Date min</label>
				<input
					bind:value={dateMin}
					type="date"
					class="form-control"
					id="date-min"
					placeholder="Enter min date"
				/>
			</div>
			<div class="col-md-6">
				<label for="date-max" class="form-label">Date max</label>
				<input
					bind:value={dateMax}
					type="date"
					class="form-control"
					id="date-max"
					placeholder="Enter max date"
				/>
			</div>
			<div class="col-md-6 mt-4">
				<button type="submit" class="btn btn-primary">Apply filters</button>
				<button
					data-bs-toggle="collapse"
					data-bs-target="#collapseExample"
					aria-expanded="false"
					aria-controls="collapseExample"
					type="submit"
					class="btn btn-secondary">Reset filters</button
				>
			</div>
		</form>
	</div>
</div>
