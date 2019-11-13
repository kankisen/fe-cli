<template>
  <table-data-template :table-data="[{}]" v-loading="false">
    <el-table-column prop="city_name" label="城市" min-width="120"></el-table-column>
    <el-table-column prop="shipper_address" label="发货地址" min-width="220"></el-table-column>
    <el-table-column prop="shipper_user_phone" label="发货手机号" min-width="160"></el-table-column>
    <el-table-column prop="consignee_address" label="收货地址" min-width="220"></el-table-column>
    <el-table-column prop="consignee_user_phone" label="收货手机号" min-width="160"></el-table-column>
    <el-table-column prop="rider_id" label="骑士ID" min-width="120"></el-table-column>
    <el-table-column prop="rider_name" label="骑士姓名" min-width="120"></el-table-column>
    <el-table-column prop="rider_phone" label="骑士手机号" min-width="120"></el-table-column>
    <el-pagination
      slot="pagination"
      small
      @current-change="() => {}"
      :current-page="1"
      :page-size="20"
      layout="total, prev, pager, next"
      :total="0"
    >
    </el-pagination>
  </table-data-template>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  computed: {
  },
  methods: {
  },
};
</script>
