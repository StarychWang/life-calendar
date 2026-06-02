# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指引。

## 项目概述

生命方格阵（Life Calendar）—— 一个 React 单页应用，将人的寿命可视化为小方格网格，每个方格代表一个月。用户输入生日和预期寿命后，可看到已度过的月份与剩余月份。当前月方格为红色并带有闪烁动画。界面为中文，采用温暖活泼的设计风格。

## 常用命令

- `npm run dev` — 启动 Vite 开发服务器（支持 HMR）
- `npm run build` — 先用 `tsc -b` 类型检查，再用 Vite 构建
- `npm run lint` — 运行 ESLint 检查
- `npm run preview` — 本地预览生产构建产物

项目未配置测试框架。

## 架构

基于 React 19 + Vite 8 + TypeScript 6 + Ant Design v6 的单页应用。状态提升至 `App.tsx`，通过 props 向下传递——无路由、无全局状态管理。

### Ant Design 集成

- **版本**: antd v6（CSS-in-JS，无需 Less）
- **全局配置**: `main.tsx` 中 `ConfigProvider` 配置中文 locale（`zhCN`）和主题 tokens；同时设置 `dayjs.locale('zh-cn')` 确保 DatePicker 弹窗内月份显示中文
- **主题 tokens**: 保留原温暖风格——`colorPrimary: '#66bb6a'`、`colorBgLayout: '#fef9ef'`、Comic Neue 字体、8/16px 圆角
- **废弃 API 注意**: antd v6 中 `Space.direction` 已废弃，用 `Flex` 替代；`InputNumber.addonAfter` 已废弃，用 `suffix`；`Statistic.valueStyle` 已废弃，用 `styles={{ content: {...} }}`

### 组件层级

- `App.tsx` — 持有 `birthday`（string）和 `lifespan`（number | null，退格可清空）状态，用 `<Flex>` 布局、`<Card>` 包裹、`<Typography>` 显示标题，条件渲染 LifeGrid 的 Card
- `LifeInput.tsx` — antd `DatePicker`（dayjs 转换，format `YYYY年MM月DD日`）+ `InputNumber`（suffix="岁"，min/max），antd icons 替换 emoji
- `LifeGrid.tsx` — antd `Statistic` 显示统计数据（带 pill 背景），`<Flex>` 布局统计栏；方格网格为纯自定义 CSS

### 方格网格布局

- 无年份/月份标签，纯方格流式排列
- 每年 12 个方格组成 `.year-group`（flex 行），小组之间有 6px 间距
- `.life-grid` 使用 CSS Grid `repeat(auto-fill, 142px)` 列布局，整体居中（`justify-content: center`），最后一行自然左对齐不会悬空居中
- 当前月方格标记 `cell-current` class，红色背景（`#ef5350`），`gentle-pulse` 闪烁动画（2 秒周期，ease-in-out 渐变过渡，红色光晕 + 微透明度变化）
- LifeGrid 使用 `lifespan ?? 80` 兜底，确保输入为空时仍能正常显示

### 样式方案

- antd 组件样式由 ConfigProvider theme tokens 控制（CSS-in-JS 自动注入）
- `index.css` 仅保留 CSS reset、`--past-color`/`--future-color` 变量、body 背景、`#root` 容器约束
- `App.css` 仅保留自定义样式：`.title-deco` 动画、`.life-card` 虚线边框覆盖、方格网格全部样式（含 `.cell-current` 闪烁）、网格响应式规则
- 日期处理用 dayjs（DatePicker 值为 dayjs 对象，与 App 中 string 状态之间转换）

### 核心数据流

`App` 持有 birthday（string）和 lifespan（number | null）→ 传递给 `LifeGrid` → `LifeGrid` 用 `lifespan ?? 80` 兜底 → 通过 `getMonthsLived()` 计算已度过月数（年×12 + 月份差） → 每年构建 12 个方格 → 每个方格根据 `monthIndex < monthsLived` 决定 `lived`，`monthIndex === monthsLived - 1` 决定 `current`