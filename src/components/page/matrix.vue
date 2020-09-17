<template>
	<div>
		<div style="display: inline-block;">
			<span>temp:</span>
			<textarea class="temp" v-model="temp"></textarea>
			<button @click="getTemp">获取</button>
		</div>
		<div class="content" style="display: inline-block;">
			<table id="tb"  width="800px" height="800px" cellpadding="" cellspacing="0" >
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				temp: '',
				arr: []
			}
		},
		mounted() {
			
		},
		methods: {
			getTemp() {
				var self = this;
				if(self.temp) {
					self.$axios.get('https://gong.fengniaotuangou.cn/api/temp', {
						 params: {
						      temp: self.temp
						    }
					}).then(res => {
						self.arr = res.data.data.fix
						this.getFor();
					})
				} else {
					alert('请输入temp')
				}
				
			},
			getFor() {
				var self = this;
				var str = '';
				for (var i = 0; i < self.arr.length; i++) {
					str += '<tr>';
					for (var j = 0; j <= self.arr[i].length - 1; j++) {
						if(self.arr[i][j] === 0 ) {
							str += `<td>${self.arr[i][j]}</td>`;
						} else {
							str += `<td style="color: red">${self.arr[i][j]}</td>`;
						}
					}
					 str += '</tr>';
				}
				tb.innerHTML = str;
			}
		}
	}
</script>

<style scoped>
	.temp {
		width: 800px;
		height: 800px;
	}
	
	#id {
		text-align: center;
	}
	
	.content {
		margin-left: 20px;
		font-weight: bold;
	}
</style>
