<p>
	<button
		class="btn btn-primary"
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
		<form class="row g-3">
			<div class="col-md-6">
				<label for="name" class="form-label">Name</label>
				<input type="text" class="form-control" id="name" placeholder="Enter name" />
			</div>
			<div class="col-md-6">
				<label for="title" class="form-label">Title</label>
				<input type="text" class="form-control" id="title" placeholder="Enter title" />
			</div>
			<div class="col-md-6">
				<label for="price-min-usd" class="form-label">Price min (USD)</label>
				<input
					type="number"
					class="form-control"
					id="price-min-usd"
					placeholder="Enter min price (USD)"
				/>
			</div>
			<div class="col-md-6">
				<label for="price-max-usd" class="form-label">Price max (USD)</label>
				<input
					type="number"
					class="form-control"
					id="price-max-usd"
					placeholder="Enter max price (USD)"
				/>
			</div>
			<div class="col-md-6">
				<label for="price-min-pln" class="form-label">Price min (PLN)</label>
				<input
					type="number"
					class="form-control"
					id="price-min-pln"
					placeholder="Enter min price (PLN)"
				/>
			</div>
			<div class="col-md-6">
				<label for="price-max-pln" class="form-label">Price max (PLN)</label>
				<input
					type="number"
					class="form-control"
					id="price-max-pln"
					placeholder="Enter max price (PLN)"
				/>
			</div>
			<div class="col-md-6">
				<label for="date-min" class="form-label">Date min</label>
				<input type="date" class="form-control" id="date-min" placeholder="Enter min date" />
			</div>
			<div class="col-md-6">
				<label for="date-max" class="form-label">Date max</label>
				<input type="date" class="form-control" id="date-max" placeholder="Enter max date" />
			</div>
			<div class="col-md-6 mt-4">
				<button
					data-bs-toggle="collapse"
					data-bs-target="#collapseExample"
					aria-expanded="false"
					aria-controls="collapseExample"
					type="submit"
					class="btn btn-primary">Apply filters</button
				>
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
