<script>
	import { page } from '$app/stores';

	const pathname = $page.url.pathname;
</script>

<div class="bg-light" style="min-height: 100dvh;">
	<div class="container">
		<nav class="navbar navbar-expand-lg navbar-light">
			<div class="container-fluid">
				<a class="navbar-brand" href="/"
					><img
						src="https://onwelo.com/wp-content/uploads/2022/12/logo-onwelo.svg"
						alt=""
						width="120"
					/></a
				>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a class="nav-link" class:active={pathname === '/'} aria-current="page" href="/"
								>Add</a
							>
						</li>
						<li class="nav-item">
							<a class="nav-link" class:active={pathname === '/ebooks'} href="/ebooks">Ebooks</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" class:active={pathname === '/authors'} href="/authors">Authors</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<slot />
	</div>
</div>
