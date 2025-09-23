<script setup lang="ts">
interface Props {
  modelValue?: "USD" | "EUR" | "MDL";
}

withDefaults(defineProps<Props>(), {
  modelValue: 'USD'
});

const emit = defineEmits<{
  'update:modelValue': [value: "USD" | "EUR" | "MDL"];
}>();

const handleCurrencyChange = (value: "USD" | "EUR" | "MDL") => {
  emit('update:modelValue', value);
};
</script>

<template>
  <Select 
    :model-value="modelValue" 
    @update:model-value="(value) => value && handleCurrencyChange(value as 'USD' | 'EUR' | 'MDL')"
  >
    <SelectTrigger class="w-auto border-1 border-gray-300 bg-transparent shadow-none hover:bg-gray-50">
      <div class="flex items-center space-x-2">
        <!-- USD Flag -->
        <svg v-if="modelValue === 'USD'" viewBox="0 0 640 480">
          <g fill-rule="evenodd">
            <g stroke-width="1pt">
              <path fill="#bd3d44" d="M0 0h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8V197H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8V512H0z" transform="scale(.9375)"/>
              <path fill="#fff" d="M0 39.4h972.8v39.4H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0z" transform="scale(.9375)"/>
            </g>
            <path fill="#192f5d" d="M0 0h389.1v275.7H0z" transform="scale(.9375)"/>
            <path fill="#fff" d="M32.4 11.8L36 22.7h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9H177l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9H242l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.2-6.7h11.4zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5z" transform="scale(.9375)"/>
          </g>
        </svg>

        <!-- EUR Flag -->
        <svg v-else-if="modelValue === 'EUR'" viewBox="0 0 640 480">
          <defs>
            <g id="d">
              <g id="b">
                <path id="a" d="M0-1l-.3 1 .5.1z"/>
                <use transform="scale(-1 1)" xlink:href="#a"/>
              </g>
              <g id="c">
                <use transform="rotate(72)" xlink:href="#b"/>
                <use transform="rotate(144)" xlink:href="#b"/>
              </g>
              <use transform="scale(-1 1)" xlink:href="#c"/>
            </g>
          </defs>
          <path fill="#039" d="M0 0h640v480H0z"/>
          <g fill="#fc0" transform="translate(320 242.3) scale(23.7037)">
            <use width="100%" height="100%" y="-6" xlink:href="#d"/>
            <use width="100%" height="100%" y="6" xlink:href="#d"/>
            <g id="e">
              <use width="100%" height="100%" x="-6" xlink:href="#d"/>
              <use width="100%" height="100%" transform="rotate(-144 -2.3 -2.1)" xlink:href="#d"/>
              <use width="100%" height="100%" transform="rotate(144 -2.1 -2.3)" xlink:href="#d"/>
              <use width="100%" height="100%" transform="rotate(72 -4.7 -2)" xlink:href="#d"/>
              <use width="100%" height="100%" transform="rotate(72 -5 .5)" xlink:href="#d"/>
            </g>
            <use width="100%" height="100%" transform="scale(-1 1)" xlink:href="#e"/>
          </g>
        </svg>

        <!-- MDL Flag -->
        <svg v-else-if="modelValue === 'MDL'" viewBox="0 0 640 480">
          <g fill-rule="evenodd" stroke-width="1pt">
            <path fill="#00319c" d="M0 0h213.3v480H0z"/>
            <path fill="#ffde00" d="M213.3 0h213.4v480H213.3z"/>
            <path fill="#de2110" d="M426.7 0H640v480H426.7z"/>
          </g>
        </svg>

        <span class="font-medium">{{ modelValue }}</span>
      </div>
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="USD">USD - US Dollar</SelectItem>
      <SelectItem value="EUR">EUR - Euro</SelectItem>
      <SelectItem value="MDL">MDL - Moldovan Leu</SelectItem>
    </SelectContent>
  </Select>
</template>
