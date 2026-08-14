# AGENTS.md

このファイルは、このリポジトリで作業する AI エージェント向けのガイドです。

## プロジェクト概要

- Nuxt 4、Vue 3、TypeScript で構築した個人ブログです。
- ブログ記事は Nuxt Content で管理します。
- UI コンポーネントは Storybook、単体テストは Vitest、E2E・アクセシビリティテストは Playwright を使用します。
- パッケージマネージャーは npm です。ほかのパッケージマネージャーを使用しないでください。
- CI では Node.js 22 を使用します。

## 主なディレクトリ

- `app/pages/`: ページコンポーネント
- `app/components/`: UI コンポーネント。原則としてコンポーネントごとのディレクトリに `index.vue`、テスト、Storybook のストーリーを配置します。
- `app/composables/`: Composition API の composable
- `app/utils/`: 汎用関数
- `app/assets/`: CSS、画像などのビルド対象アセット
- `content/`: Markdown 形式のブログ記事
- `public/`: そのまま配信する静的ファイル
- `i18n/locales/`: 日本語・英語の翻訳リソース
- `e2e/`: Playwright の E2E・アクセシビリティテスト
- `terraform/`: インフラストラクチャ定義

## セットアップと主要コマンド

```bash
npm ci                 # 依存関係を lockfile どおりにインストール
npm run dev            # 開発サーバーを起動
npm run build          # プロダクションビルド
npm run generate       # 静的サイトを生成
npm run lint           # ESLint を実行
npm run lint:text      # Markdown を含む文章を textlint で検査
npm run test:unit      # Vitest とカバレッジを実行
npm run test:e2e       # Playwright を全ブラウザーで実行
npm run storybook      # Storybook を起動
npm run build-storybook # Storybook をビルド
```

## 実装方針

- 既存の構造、命名、コードスタイルを優先し、依頼と無関係なリファクタリングや整形を行わないでください。
- Vue コンポーネントでは `<script setup lang="ts">` を使用し、既存の Nuxt auto-import を活用してください。
- ページ固有でない UI は `app/components/`、再利用可能な状態や処理は `app/composables/` または `app/utils/` に配置してください。
- CSS は既存のカスタムプロパティとスタイル規則を再利用してください。コンポーネント固有のスタイルは原則として `<style scoped>` に記述します。
- ユーザー向け文言を追加・変更するときは、`i18n/locales/ja.ts` と `i18n/locales/en.ts` の対応を確認してください。
- アクセシビリティを維持し、意味のある HTML、キーボード操作、ラベル、フォーカス状態を考慮してください。
- 依存関係を追加する前に、既存の依存関係や標準 API で実現できないか確認してください。追加する場合は `package.json` と `package-lock.json` を同時に更新します。
- 自動生成ファイルや生成物（`.nuxt/`、`.output/`、`coverage/`、`storybook-static/`、`playwright-report/`、型生成ファイルなど）は、明示的な依頼がない限り手動編集・コミットしないでください。

## ブログ記事

- 記事は `content/<番号>.<slug>.md` に配置し、既存記事と同じ frontmatter 形式を使用してください。
- frontmatter には `title`、`description`、`published`、`emoji`、`createdAt`、`updatedAt`、`tags` を設定します。
- 日付は `YYYY-MM-DD` 形式にしてください。
- 記事本文は日本語を基本とし、画像は内容を説明する代替テキストを付けてください。
- 記事や Markdown を変更した場合は `npm run lint:text` を実行してください。

## テストと確認

- 振る舞いを変更した場合は、同じ粒度のテストを追加または更新してください。
- コンポーネントとユーティリティの単体テストは対象の近くに `*.spec.ts` として配置します。
- 再利用可能な UI の表示状態を変更した場合は、対応する `*.stories.ts` も確認・更新してください。
- ページ遷移やブラウザー操作に関わる変更は `e2e/` のテスト対象です。
- まず変更範囲に近いテストを実行し、完了前に可能な範囲で以下を確認してください。

```bash
npm run lint
npm run test:unit
npm run build
```

- Markdown を変更した場合は `npm run lint:text`、主要なユーザーフローを変更した場合は `npm run test:e2e`、Storybook 対象の UI を変更した場合は `npm run build-storybook` も実行してください。
- 実行できなかった検証や既知の失敗がある場合は、最終報告で明記してください。

## 変更時の注意

- `.env` や認証情報をコミットしないでください。必要な環境変数の例は `.env.example` に、値を含めず追記します。
- 既存のユーザー変更を上書きしたり、依頼と無関係なファイルを元に戻したりしないでください。
- Terraform を変更する場合は、対象リソースと影響範囲を確認し、適用は明示的に依頼された場合だけ行ってください。
- 完了報告には、変更内容、主な変更ファイル、実行した検証と結果を簡潔に含めてください。
