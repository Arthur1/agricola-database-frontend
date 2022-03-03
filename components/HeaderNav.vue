<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand to="/">Agricola DB</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/" active-class="active">Home</b-nav-item>
        <b-nav-item to="/AG1/cards" active-class="active"
          >カード一覧 (AG1)</b-nav-item
        >
        <b-nav-item to="/AG2/cards" active-class="active"
          >カード一覧 (AG2)</b-nav-item
        >
        <b-nav-item to="/about" active-class="active"
          >本サイトについて</b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
