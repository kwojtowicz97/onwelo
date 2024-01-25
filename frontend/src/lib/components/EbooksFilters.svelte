<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const searchParams = $page.url.searchParams;

	$: name = searchParams.get('name') || undefined;
	$: title = searchParams.get('title') || undefined;

	const priceusd = searchParams.get('priceusd')?.split(',');
	$: priceMinUsd = priceusd?.at(0) ? priceusd[0] : undefined;
	$: priceMaxUsd = priceusd?.at(1) ? priceusd[1] : undefined;

	const pricepln = searchParams.get('pricepln')?.split(',');
	$: priceMinPln = pricepln?.at(0) ? pricepln[0] : undefined;
	$: priceMaxPln = pricepln?.at(1) ? pricepln[1] : undefined;

	const date = searchParams.get('date')?.split(',');

	let hideButton: HTMLButtonElement;

	$: dateMin = date && date[0] ? new Date(+date[0]).toISOString().split('T')[0] : undefined;
	$: dateMax = date && date[1] ? new Date(+date[1]).toISOString().split('T')[0] : undefined;

	const submitHandler = async (e: Event) => {
		e.preventDefault();
		const searchParams = new URLSearchParams($page.url.searchParams.toString());
		if (name) {
			searchParams.set('name', name);
		} else {
			searchParams.delete('name');
		}
		if (title) {
			searchParams.set('title', title);
		} else {
			searchParams.delete('title');
		}
		if (priceMinUsd !== undefined || priceMaxUsd !== undefined) {
			searchParams.set(
				'priceusd',
				`${priceMinUsd !== undefined ? priceMinUsd : ''},${priceMaxUsd !== undefined ? priceMaxUsd : ''}`
			);
		} else {
			searchParams.delete('priceusd');
		}
		if (priceMinPln !== undefined || priceMaxPln !== undefined) {
			searchParams.set(
				'pricepln',
				`${priceMinPln !== undefined ? priceMinPln : ''},${priceMaxPln !== undefined ? priceMaxPln : ''}`
			);
		} else {
			searchParams.delete('pricepln');
		}
		if (dateMin || dateMax) {
			searchParams.set(
				'date',
				`${dateMin ? new Date(dateMin).getTime() : ''},${dateMax ? new Date(dateMax).getTime() : ''}`
			);
		} else {
			searchParams.delete('date');
		}
		goto(`?${searchParams.toString()}`, { noScroll: true });
		hideButton.click();
	};

	const resetFilters = () => {
		name = undefined;
		title = undefined;
		priceMinUsd = undefined;
		priceMaxUsd = undefined;
		priceMinPln = undefined;
		priceMaxPln = undefined;
		dateMin = undefined;
		dateMax = undefined;
		goto(`?`);
		hideButton.click();
	};
</script>

<p>
	<button
		bind:this={hideButton}
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
				<label for="name" class="form-label">Author</label>
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
					min="0"
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
					min="0"
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
					min="0"
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
					min="0"
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
				<button on:click={resetFilters} type="button" class="btn btn-secondary"
					>Reset filters</button
				>
			</div>
		</form>
	</div>
</div>
