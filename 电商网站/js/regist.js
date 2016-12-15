$('#registPanel').validate({
	rules:{
		username:{
			required: true,
			minlength: 2,
			maxlength: 12
		},
		password:{
			required: true,
			minlength: 6,
			maxlength: 12
		},
		passwordSure:{
			required: true,
			equalTo: '#password'
		},
		email:{
			required: true,
			email:true
		},
		location:{
			required:true
		}
	},
	success:function(label){
		label.html('格式正确').addClass('success');
	},
	messages:{
		username:{
			required: '必须填写用户名',
			minlength: '用户名最少为2位',
			maxlength: '用户名不得超过12位'
		},
		password:{
			required: '必须填写密码',
			minlength: '密码最少为6位',
			maxlength: '密码不得超过12位'
		},
		passwordSure:{
			required: '请再次填写密码',
			equalTo: '两次密码不一致'
		},
		email:{
			required: '请填写邮箱地址',
			email:'邮箱格式不正确'
		},
		location:{
			required:'请填写送货地址'
		}
	}
});