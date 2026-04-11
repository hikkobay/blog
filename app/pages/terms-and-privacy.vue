<script setup lang="ts">
const { locale } = useI18n()

useHead({
  title: locale.value === 'ja' ? '利用規約とプライバシーポリシー' : 'Terms and Privacy',
})

defineOgImage('NuxtSeo', {
  title: locale.value === 'ja' ? '利用規約とプライバシーポリシー' : 'Terms and Privacy',
})
</script>

<template>
  <main v-if="locale === 'ja'">
    <h1>利用規約とプライバシーポリシー</h1>
    <p class="date-of-issue">
      発行日 2024年5月2日
    </p>

    <p>本規約は、当サイトの利用に関する規定を定めるものです。</p>
    <p>
      当サイトを利用することにより、以下の条件に同意したものとみなされます。
    </p>

    <h2>収集される情報</h2>
    <section>
      <p>
        当サイトでは、利用者がブログ記事を閲覧する際に、IPアドレス、Cookie、ブラウザの種類、利用されたデバイスなどの一般的な情報が自動的に収集される場合があります。
      </p>
      <p>ただし、これらの情報は個人を特定するためのものではありません。</p>
    </section>

    <h2>Cookieの使用</h2>
    <section>
      <p>当サイトでは、広告配信のためにCookieを使用する場合があります。</p>
      <p>
        Cookieは、利用者のブラウジング体験を向上させるために使用されますが、個人を特定する情報は保存されません。
      </p>
    </section>

    <h2>広告配信事業者の利用</h2>
    <section>
      <p>当サイトでは、広告配信サービスを利用することがあります。</p>
      <p>
        広告配信サービスの提供者は、利用者の興味に基づいて当サイトや他のウェブサイトに広告を表示するために、Cookieやウェブビーコンなどの技術を使用する場合があります。
      </p>
      <p>これらの技術により、利用者の個人情報を収集することはありません。</p>
    </section>

    <h2>外部リンク</h2>
    <section>
      <p>当サイトには、他のウェブサイトへのリンクが含まれる場合があります。</p>
      <p>
        外部サイトにおける個人情報の保護については、当サイトは責任を負いかねます。
      </p>
      <p>
        外部サイトへのリンクをクリックされた場合は、リンク先サイトのプライバシーポリシーを確認してください。
      </p>
    </section>

    <h2>免責事項</h2>
    <section>
      <p>
        当サイトの内容は、個人のウェブサイトであり、専門的な助言を代替するものではありません。
      </p>
      <p>当サイトの情報に基づく行動は、個人の責任において行われるべきです。</p>
      <p>
        当サイトは、利用者が当サイトのコンテンツを利用したことにより直接または間接的に生じた損害について、一切の責任を負いません。
      </p>
    </section>

    <h2>本規約の変更</h2>
    <section>
      <p>
        本規約は随時変更される場合があります。変更後の規約は、当サイトに掲載された時点で効力を生じます。
      </p>
      <p>
        変更後も当サイトを利用する場合は、変更後の規約に同意したものとみなされます。
      </p>
    </section>

    <h2>お問い合わせ</h2>
    <section>
      <p>
        本規約および当サイトに関するお問い合わせは、<a
          href="https://twitter.com/hikkobay"
          target="_blank"
        >X</a>のDMにてご連絡ください。
      </p>
    </section>
  </main>
  <main v-else>
    <h1>Terms and Privacy</h1>
    <p class="date-of-issue">
      Issued on May 2, 2024
    </p>

    <p>These terms govern the use of this website.</p>
    <p>
      By using this site, you are deemed to have agreed to the following conditions.
    </p>

    <h2>Information Collected</h2>
    <section>
      <p>
        When users view blog posts on this site, general information such as IP address, cookies, browser type, and device used may be automatically collected.
      </p>
      <p>However, this information is not used to personally identify individuals.</p>
    </section>

    <h2>Use of Cookies</h2>
    <section>
      <p>This site may use cookies for ad delivery purposes.</p>
      <p>
        Cookies are used to improve the user browsing experience and do not store personally identifiable information.
      </p>
    </section>

    <h2>Use of Ad Services</h2>
    <section>
      <p>This site may use third-party ad delivery services.</p>
      <p>
        Ad service providers may use technologies such as cookies and web beacons to display advertisements on this and other websites based on user interests.
      </p>
      <p>These technologies do not collect any personally identifiable information.</p>
    </section>

    <h2>External Links</h2>
    <section>
      <p>This site may contain links to other websites.</p>
      <p>
        This site is not responsible for the protection of personal information on external websites.
      </p>
      <p>
        When clicking on external links, please check the privacy policy of the destination website.
      </p>
    </section>

    <h2>Disclaimer</h2>
    <section>
      <p>
        The content of this site is operated as a personal website and is not intended to replace professional advice.
      </p>
      <p>Actions taken based on the information on this site are at the user's own responsibility.</p>
      <p>
        This site assumes no responsibility for any direct or indirect damages caused by the use of its content.
      </p>
    </section>

    <h2>Changes to These Terms</h2>
    <section>
      <p>
        These terms may be updated from time to time. The revised terms will take effect once posted on this site.
      </p>
      <p>
        Continued use of the site after changes are made implies acceptance of the new terms.
      </p>
    </section>

    <h2>Contact</h2>
    <section>
      <p>
        For inquiries regarding these terms or the site, please contact us via DM on <a
          href="https://twitter.com/hikkobay"
          target="_blank"
        >X</a>.
      </p>
    </section>
  </main>
</template>

<style scoped>
main {
  flex: 1;
  width: 100%;
  max-width: 840px;
  margin: 0 auto;
  padding: 32px 16px;
}

h1 {
  font-size: 32px;
  text-align: center;
  margin-bottom: 16px;
  color: var(--primary-text-color);
}

h2 {
  font-size: 24px;
  margin: 48px 0 16px;
  color: var(--primary-text-color);
}

p {
  color: var(--primary-text-color);
  margin-bottom: 8px;
}

section > p:last-child {
  margin-bottom: 0;
}

.date-of-issue {
  text-align: center;
  font-size: 14px;
  padding-bottom: 32px;
  margin-bottom: 48px;
  border-bottom: 1px solid var(--primary-border-color);
}
</style>
