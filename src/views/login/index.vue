<template>
  <div class="login-wrapper">
    <div class="login-form-wrap">
      <div class="logo">
        <img src="./img/login_logo.png" alt />
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <!-- prop里的mobile和v-model的mobile还有规则里的mobile必须一致 -->
        <el-form-item prop="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="请输入手机号" :value="18801185985" ></el-input>
        </el-form-item>
        <!-- 使用栅格布局 整合按钮和验证码框 -->
        <el-form-item prop="code">
          <el-row >
          <el-col :span="12"><el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input></el-col>
          <el-col :span="9" :offset="3">
            <!-- 这里设置如果倒计时不等于60s的时候设置禁止按钮 -->
            <el-button @click="getCode"  style="width:100%" :disabled="sec != 60">{{sec == 60?'获取验证码':sec+'秒'}}</el-button>
            </el-col>
        </el-row>
        </el-form-item>
        <el-form-item style="marginBottom:0px;">
          <!-- 这里传入的参数是 ref的表单元素 ,在方法里可以接受并执行回调函数验证值是否匹配 -->
          <el-button type="primary" class="btn-login" @click="login('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //表单对象
      ruleForm: {
        mobile: "",
        code: ""
      },
      //表单验证规则
      rules: {
        mobile: [
          { required: true, message: "请输入完整的手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号的位数是11位哦", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "验证码需要6位", trigger: "blur" }
        ]
      },
      sec:60
    };
  },
  methods: {
    //验证码设置相关
    getCode(){
      if(this.ruleForm.mobile == '' || this.ruleForm.mobile.length != 11 ){
         this.$message.error('手机号码有误,请检查一下吧');
         return;
      }
      //开始倒计时
      this.sec--;//倒计时优化一开始先减一秒
      let timer = setInterval(() => {
        this.sec--;
        if(this.sec == 56){
          this.ruleForm.code = '246810';
        }
        if(this.sec == 0){
          clearInterval(timer);
          this.sec=60;
        }
      }, 1000);
    },
    //用户登录相关
    login(formName){
      // 找到这个表单并调用validate方法（此方法是验证这个表单内所有元素是否全部通过规则）
      this.$refs[formName].validate(value=>{
        if(value){
          //能到这一步说明表单验证通过,可以发送请求了
          this.$axios.post(`http://ttapi.research.itcast.cn/mp/v1_0/authorizations`,{
            mobile:this.ruleForm.mobile,
            code:this.ruleForm.code
          }).then(res=>{
            console.log(res);
            //如果 res.data.data如果存在,则获取成功
            if(res.data.data){
                this.$message({
                  message: "登录成功！",
                  type: "success"
                });
                this.$router.push({
                  path:'/home'
                })
            }else {
              this.$message({
                  message: "账号或者密码不正确哦",
                  type: "error"
                });
            }
          })
          .catch(err=>{
            this.$message({
                  message: "账号或者密码不正确哦",
                  type: "error"
                });
          })
        }else{
          return false;
        }
      });

    }
  },
};
</script>

<style lang="less" scoped>
.login-wrapper {
  height: 100%;
  background: url("./img/login_bg.jpg") center / cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form-wrap {
    width: 400px;
    background-color: aliceblue;
    box-sizing: border-box;
    padding: 50px;
    border-radius: 4px;
    opacity: .9;

    .logo {
      text-align: center;
      margin-bottom: 40px;

      img {
        width: 200px;
      }
    }
    
    .btn-login {
      width: 100%;
    }
  }
}
</style>