<script setup lang="ts">
useHead({
  title: 'Hikaru Kobayashi',
  titleTemplate: null,
})

defineOgImage('NuxtSeo', {
  title: 'Hikaru Kobayashi',
})

const staff = getStaff()
const sns = getSns()
</script>

<template>
  <main>
    <NuxtImg
      src="/images/hikkobay.png"
      width="160"
      height="160"
      class="avatar"
      alt=""
    />
    <h1 class="name">
      Hikaru Kobayashi
    </h1>
    <div class="overview">
      <p>I am Hikaru Kobayashi, frontend developer from Japan.</p>
      <p>I write <a href="/">blog</a> about coding, idea, etc.</p>
      <p>Outside of working, I enjoy swimming and traveling.</p>
      <p>Also, I join as a staff in events such as VueFesJapn.</p>
    </div>
    <div class="links">
      <a
        v-for="(data, index) in sns"
        :key="index"
        :href="data.href"
        target="_blank"
      >{{ data.name }}</a>
    </div>
    <div>
      <h2 class="sub-title">
        Staff
      </h2>
      <ul class="staff">
        <li
          v-for="(data, index) in staff"
          :key="index"
        >
          <a
            class="link"
            :href="data.url"
            target="_blank"
          >
            {{ data.name }}
          </a>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
main {
  flex: 1;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 32px 16px;
}

.avatar {
  display: block;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin: 0 auto;
}

.name {
  font-size: 32px;
  margin: 32px auto 16px;
  color: var(--primary-text-color);
}

.sub-title {
  font-size: 24px;
  margin: 32px auto 16px;
  color: var(--primary-text-color);
}

.overview {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.overview > p {
  color: var(--primary-text-color);
}

.links {
  display: flex;
  align-items: center;
  gap: 0 8px;
  margin-top: 24px;
}

.links > a,
.link {
  color: #1558d6;
}

.staff {
  width: fit-content;
  list-style: none;
}

.staff > li:not(:last-child) {
  margin-bottom: 8px;
}
</style>
