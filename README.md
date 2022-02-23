# tailwindcss-range

Style range slider `<input type="range" />` with tailwindcss

## Install

```shell
npm i tailwindcss-range
```

Add to tailwind.config.js

```js
module.exports = {
  theme: {},
  variants: {},
  plugins: [require("tailwindcss-range")],
};
```

## Example

```tsx
<input
  className="range-slider range-slider-thumb-white range-slider-track-black/25 range-slider-thumb-[30px] md:range-slider-thumb-[20px] mb-[0.25em] flex-grow"
  type="range"
  value={props.value}
  onChange={(e) => props.onChange(Number(e.target.value))}
  min={props.min}
  max={props.max}
  step={props.step}
/>
```
