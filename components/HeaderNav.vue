<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand to="/">Agricola DB</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/AG1/cards">カード一覧 (AG1)</b-nav-item>
        <b-nav-item to="/AG2/cards">カード一覧 (AG2)</b-nav-item>
        <b-nav-item to="/about">本サイトについて</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
