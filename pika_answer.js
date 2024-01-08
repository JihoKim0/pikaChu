/*
Pikachu.EXE
1P:왼쪽 플레이어, 2P:오른쪽 플레이어
1. 무조건 2P가 점수먹기
2. 1P 점수조작(바로 15점)
3. 2P 점수조작(바로 15점)

*/

//1.
var pika = ptr(0x403C47);
Interceptor.attach(pika, {
	onEnter: function (args) {
		this.context.eax = 0x1;	//2P
		this.context.eax = 0x0;	//1P
	},
	onLeave: function (retval) {
	},
});

//2.
var pika2 = ptr(0x403C54);
Interceptor.attach(pika2, {
	onEnter: function (args) {
		this.context.ecx = 0xf;
		
	},
	onLeave: function (retval) {
	},
});


//3.
var pika3 = ptr(0x403C54);
Interceptor.attach(pika3, {
	onEnter: function (args) {
		var score = this.context.esi;
		/*Memory.protect(ptr(score), 16, 'rwx');*/
		/*console.log(score.add(64).readPointer()); //2P 점수*/
		Memory.writeByteArray(score.add(64), [0xf]);
		
	},
	onLeave: function (retval) {
	},
});
