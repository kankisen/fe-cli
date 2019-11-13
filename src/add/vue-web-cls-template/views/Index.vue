<template>
  <div>
    <tool-bar></tool-bar>
    <table-data></table-data>
  </div>
</template>
<script>
import ToolBar from './ToolBar';
import TableData from './TableData';

export default {
  components: {
    ToolBar,
    TableData,
  },
};
</script>