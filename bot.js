const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!'


var count=0;
var cash, chcash, error=0;
var for_count, a=0;
var username= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var picked_user= ['', '', '', '', '', '', '', '', '', ''];
var of_maps=['별장', '영사관', '도스토예프스키카페', '은행', '클럽하우스', '국경', '마천루', '해안선', '오리건'];
//var casual_maps=[헤리퍼드기지, 저택, 운하, 비행기, 테마파크, 타워, 요트];
//var trash_maps=[바틀렛대학교, 빈민가];
var userstatus= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var userpicked= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var full=0;
var pick_turn=0;
var blue_count=1; //블루 슬롯(0부터 시작하나, 0은 캡틴자리)
var red_count=6;
var maplog_sum=0;
var game_mode=0;
var game_mode_char=['내전 캡틴전', '내전 랜덤전', '내전 캡틴+랜덤오퍼전'];
var unknown_commend=0;
var pick_time=0;

var tournament_team = [':white_large_square:', ':white_large_square:', ':white_large_square:', ':white_large_square:', ':white_large_square:', ':white_large_square:', ':white_large_square:', ':white_large_square:', ':white_large_square:', ':white_large_square:', ':white_large_square:', ':white_large_square:', ':white_large_square:', ':white_large_square:', ':white_large_square:'];



var maplog=[0, 0, 0, 0, 0, 0, 0, 0, 0];



client.on('ready', () => {
  console.log('NeJunbot on!'); 
});





client.on('message', message => {
	


    var tournament = function (team) {


        message.channel.send({
            embed: {
                color: 3447003,
                fields: [{
                    name: "- 대진표",
                    value: (`ㅤㅤ                                               ${tournament_team[0]}\n                              ┌────────┴───────┐\nㅤㅤ                   ${tournament_team[1]}ㅤㅤ                                     ${tournament_team[2]}\nㅤㅤㅤ    ┌───┴───┐ㅤㅤ                ┌───┴───┐\nㅤ      ㅤ${tournament_team[3]}  ㅤ   ${tournament_team[4]}ㅤㅤ            ${tournament_team[5]}ㅤ   ㅤ      ${tournament_team[6]}\nㅤ      ┌─┴─┐ㅤ      ┌─┴─┐ㅤㅤ   ┌─┴─┐ㅤ     ┌─┴─┐\nㅤ    ${tournament_team[7]}     ${tournament_team[8]}       ${tournament_team[9]}     ${tournament_team[10]}        ${tournament_team[11]}     ${tournament_team[12]}      ${tournament_team[13]}     ${tournament_team[14]}`)
                }
                ]

            }
        });

    }	
	
	
////////////////////////////////////////////// 오프라인시 킥 함수
function online_check1() { 
	var cash_1;
	if(full==0){
		for(for_count=0;for_count<=9;for_count++)
		{   
			cash_1=username[for_count];
			if(cash_1==0)
			{continue;}
			userstatus[for_count]=cash_1.presence.status
			if((userstatus[for_count])=='offline')
			{
			message.channel.send(`${username[for_count]}님이 오프라인 상태이므로 등록인원에서 제외되었습니다. [${count-1}/10]`);
			username[for_count]=0;
			userstatus[for_count]=0;
			count--;
			}
		}
		setTimeout(online_check2, 100000);
	}
}

function online_check2() { 
	if(full==0){
	setTimeout(online_check1, 100000);
	}
}
	
	
////////////////////////////////////////////// 난수함수
var generateRandom = function (min, max) { 
   
   
   var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
  
	  return ranNum;
   }
  
   		
////////////////////////////////////////////// 랜덤맵함수
function random_map() {

	var random=0;
	while(true){
		random=generateRandom(0, 8);
		if(maplog_sum==9)
		{
			for(for_count=0;for_count<=8;for_count++)
			{
			maplog[for_count]=0;
			}
			maplog_sum=0;
			
		}
		else if((maplog[random])==0){
		maplog[random]=1;
		break;
		}
		
	}
	maplog_sum++;
	return of_maps[random]; //대회맵 배열 random번째 있는 값 리턴

}	


////////////////////////////////////////////// 캡틴픽랜덤픽 함수
function captin_pick() {
	var cap_1, cap_2, cap_3;
	cap_1=generateRandom(0, 9);
	while(true)
	{		
		cap_2=generateRandom(0, 9);
		if(cap_1==cap_2)
		{
			cap_2=generateRandom(0, 9);		
		}
		
		else
		{
			picked_user[0]=username[cap_1];
			picked_user[5]=username[cap_2];
			username[cap_1]='';
			username[cap_2]='';
			break;	
		}
	}	
	
	pick_embed();
	pick_time=1; //!선택 명령어 활성화
}


////////////////////////////////////////////// 캡틴픽랜덤픽 함수
function random_pick() {

var random_pick_value;
var random_count=0;
	while(true)
	{		
		random_pick_value=generateRandom(0, 9);
		
		if((userpicked[random_pick_value])==0)
		{picked_user[random_pick_value]=username[random_pick_value];
		userpicked[random_pick_value]=1;
		random_count++;
		//message.channel.send(random_count);
		}
		else if(random_count==10)
		{
			break;
		}
		
		
		
	}	
	
	pick_embed();
	clear_que();
}



////////////////////////////////////////////// 픽창 함수
function pick_embed() {
	if(game_mode==0)
	{
		message.channel.send({embed: {
		color: 3447003,
		fields: [{
			name: "- 선택된 플레이어",
			value: (`:small_blue_diamond:청팀: ${picked_user[0]} ${picked_user[1]} ${picked_user[2]} ${picked_user[3]} ${picked_user[4]} \n:small_orange_diamond:주황팀: ${picked_user[5]} ${picked_user[6]} ${picked_user[7]} ${picked_user[8]} ${picked_user[9]}`)},
			{
			name: "- 캡틴",
			value: (`:small_blue_diamond:청팀: ${picked_user[0]} \n:small_orange_diamond:주황팀:${picked_user[5]}`)},
			{
			name: "- 선택대기 플레이어",
			value: (`${username[0]} ${username[1]} ${username[2]} ${username[3]} ${username[4]} ${username[5]} ${username[6]} ${username[7]} ${username[8]} ${username[9]}`)},
			{
			name: "- 선택방법",
			value: (`!선택 @유저이름  [@자동완성 기능으로 입력하시기 바랍니다]\n청팀부터 선택 가능하며, 양측 캡틴이 교대로 선택하게 됩니다. \n\n 현재 게임모드: ${game_mode_char[game_mode]}`)},
		]
			
		}	
		});
	}
	
	
		if(game_mode==1)
	{
		message.channel.send({embed: {
		color: 3447003,
		fields: [{
			name: "- 랜덤픽 결과",
			value: (`:small_blue_diamond:청팀: ${picked_user[0]} ${picked_user[1]} ${picked_user[2]} ${picked_user[3]} ${picked_user[4]} \n:small_orange_diamond:주황팀: ${picked_user[5]} ${picked_user[6]} ${picked_user[7]} ${picked_user[8]} ${picked_user[9]}`)},
			
			
		]
			
		}	
		});
	}
	
	
}	

////////////////////////////////////////////// 매치재시작 함수		
function clear_que() {

count=0;
cash=0;
for_count=0;
full=0;
pick_turn=0;
blue_count=1; 
red_count=6;
maplog_sum=0;
game_mode=0;
pick_time=0;

for(for_count=0;for_count<=9;for_count++){
	
	username[for_count]= 0;
	userstatus[for_count]= 0;
	picked_user[for_count]= '';
	userpicked[for_count]= 0;
	
	}
	
for(for_count=0;for_count<=8;for_count++){
	maplog[for_count]=0;
	}
}	
		
////////////////////////////////////////////// 참가 
if ((message.content === `${prefix}등록`)||(message.content === `${prefix}참가`)) {


	cash=message.author; //중복체크 거쳐 들어가기 위한 캐쉬저장
	if(count<10){
		for(for_count=0;for_count<=9;for_count++) 
		{
			  
			//중복 체크 활성화
			
			if(username[for_count]==cash)
			{
				message.channel.send(`${username[for_count]}님은 이미 참가목록에 있습니다.`);
					break; //에러발생시 에러활성화
				
			}
			  
		 if(username[for_count]==0){
				
			username[for_count]=cash;
			//username 배열에 임시값 저장		

			message.channel.send({embed: {
			color: 3066993,
			fields: [{name: "- 매치 참가목록에 등록되었습니다", value: (`${username[for_count]}님 참가되었습니다 [${count+1}/10]`)},
			{name: "- 현재 게임모드", value: (game_mode_char[game_mode])} ],
			}});
			
			tournament();
			count++;			
			
			break;
			}
		}
	}
		
	if ((count==10)&&(full==0)){
		
		if(game_mode==0) //내전 캡틴전
		{
		//message.reply('매치 스타트!');
		message.channel.send(` **모두 모여주세요! 선택이 시작되었습니다!** \n${username[0]} ${username[1]} ${username[2]} ${username[3]} ${username[4]} \n${username[5]} ${username[6]} ${username[7]} ${username[8]} ${username[9]}`);
		captin_pick();
		full=1;
		}
		if(game_mode==1) //내전 랜덤전
		{
		message.channel.send(` **모두 모여주세요! 게임이 시작되었습니다!** \n${username[0]} ${username[1]} ${username[2]} ${username[3]} ${username[4]} \n${username[5]} ${username[6]} ${username[7]} ${username[8]} ${username[9]}`);
		random_pick();
		}
	
	
	}
	else if(full==1){

	//빨간 에러
	
		message.channel.send({embed: {
		color: 15158332,
		fields: [{
		name: "- 에러",
		value: (`${cash}님 인원 모집이 끝났습니다`)}
		]
		}	
		});
	
	}
}


////////////////////////////////////////////// 퇴장
else if ((message.content === `${prefix}나가기`)||(message.content === `${prefix}퇴장`)) {
//리브 명령어
	cash=message.author; 
	var not_match_count=0;
	if(full==0){
		for(for_count=0;for_count<=9;for_count++) //중복체크
		{
			
			if((username[for_count])==(cash))
			{
			message.channel.send(`${username[for_count]}님의 요청으로 참가목록에서 제외되었습니다. [${count-1}/10]`); 
			username[for_count]=0;
			count--;
			break; //불필요 리소스 방지
			}
			not_match_count++;
			
		}
		if(not_match_count==10){
			message.channel.send(`${cash}님은 참가인원 목록에 있지 않았습니다.`);
		}
		
	}	
	else{
		// cash님, 매치가 시작되어 나가실 수 없습니다
		//빨간 에러
		message.channel.send({embed: {
		color: 15158332,
		fields: [{
		name: "- 에러",
		value: (`${cash}님 매치가 시작되어 나가실 수 없습니다`)}
		]
		}	
		});		
		
	}
}


////////////////////////////////////////////// 퇴장



////////////////////////////////////////////// 등록인원
else if (message.content === `${prefix}등록인원`) {
	
	var que_sort=new Array(count);
	var for_count2=0;
	
	for(for_count=0; for_count<=9; for_count++)
	{
		
		if ((username[for_count])!=0)
		{
			que_sort[for_count2]=username[for_count];
			for_count2++;
		}	
		
	}
	
	//commands.map(command => command.name).join(', ')
	if(for_count2==0)
	{
	message.channel.send({embed: {
    color: 3447003,
    fields: [{name: "- 등록인원",value: ('온기조차 느낄 수 없습니다.. [0/10]')},
      {name: "- 도우말 명령어",value: (`${prefix}명령어`)} ],
    timestamp: new Date(),}});
	}
	if(for_count2==1)
	{
	message.channel.send({embed: {
    color: 3447003,
    fields: [{name: "- 등록인원",value: (`1. ${que_sort[0]}\n`)},
      {name: "- 도우말 명령어",value: (`${prefix}명령어`)} ],
    timestamp: new Date(),}});
	}
	else if(for_count2==2)
	{
	message.channel.send({embed: {
    color: 3447003,
    fields: [{name: "- 등록인원",value: (`1. ${que_sort[0]}\n2. ${que_sort[1]}\n`)},
      {name: "- 도우말 명령어",value: (`${prefix}명령어`)} ],
    timestamp: new Date(),}});
	}
	else if(for_count2==3)
	{
	message.channel.send({embed: {
    color: 3447003,
    fields: [{name: "- 등록인원",value: (`1. ${que_sort[0]}\n2. ${que_sort[1]}\n3. ${que_sort[2]}\n`)},
      {name: "- 도우말 명령어",value: (`${prefix}명령어`)} ],
    timestamp: new Date(),}});
	}
	else if(for_count2==4)
	{
	message.channel.send({embed: {
    color: 3447003,
    fields: [{name: "- 등록인원",value: (`1. ${que_sort[0]}\n2. ${que_sort[1]}\n3. ${que_sort[2]}\n4. ${que_sort[3]}\n`)},
      {name: "- 도우말 명령어",value: (`${prefix}명령어`)} ],
    timestamp: new Date(),}});
	}
	else if(for_count2==5)
	{
	message.channel.send({embed: {
    color: 3447003,
    fields: [{name: "- 등록인원",value: (`1. ${que_sort[0]}\n2. ${que_sort[1]}\n3. ${que_sort[2]}\n4. ${que_sort[3]}\n5. ${que_sort[4]}\n`)},
      {name: "- 도우말 명령어",value: (`${prefix}명령어`)} ],
    timestamp: new Date(),}});
	}
	else if(for_count2==6)
	{
	message.channel.send({embed: {
    color: 3447003,
    fields: [{name: "- 등록인원",value: (`1. ${que_sort[0]}\n2. ${que_sort[1]}\n3. ${que_sort[2]}\n4. ${que_sort[3]}\n5. ${que_sort[4]}\n6. ${que_sort[5]}\n`)},
      {name: "- 도우말 명령어",value: (`${prefix}명령어`)} ],
    timestamp: new Date(),}});
	}
	else if(for_count2==7)
	{
	message.channel.send({embed: {
    color: 3447003,
    fields: [{name: "- 등록인원",value: (`1. ${que_sort[0]}\n2. ${que_sort[1]}\n3. ${que_sort[2]}\n4. ${que_sort[3]}\n5. ${que_sort[4]}\n6. ${que_sort[5]}\n7. ${que_sort[6]}\n`)},
      {name: "- 도우말 명령어",value: (`${prefix}명령어`)} ],
    timestamp: new Date(),}});
	}
	else if(for_count2==8)
	{
	message.channel.send({embed: {
    color: 3447003,
    fields: [{name: "- 등록인원",value: (`1. ${que_sort[0]}\n2. ${que_sort[1]}\n3. ${que_sort[2]}\n4. ${que_sort[3]}\n5. ${que_sort[4]}\n6. ${que_sort[5]}\n7. ${que_sort[6]}\n8. ${que_sort[7]}\n`)},
      {name: "- 도우말 명령어",value: (`${prefix}명령어`)} ],
    timestamp: new Date(),}});
	}
	else if(for_count2==9)
	{
	message.channel.send({embed: {
    color: 3447003,
    fields: [{name: "- 등록인원",value: (`1. ${que_sort[0]}\n2. ${que_sort[1]}\n3. ${que_sort[2]}\n4. ${que_sort[3]}\n5. ${que_sort[4]}\n6. ${que_sort[5]}\n7. ${que_sort[6]}\n8. ${que_sort[7]}\n9. ${que_sort[8]}\n`)},
      {name: "- 도우말 명령어",value: (`${prefix}명령어`)} ],
    timestamp: new Date(),}});
	}
	else if(for_count2==10)
	{
	message.channel.send({embed: {
    color: 3447003,
    fields: [{name: "- 등록인원",value: (`1. ${que_sort[0]}\n2. ${que_sort[1]}\n3. ${que_sort[2]}\n4. ${que_sort[3]}\n5. ${que_sort[4]}\n6. ${que_sort[5]}\n7. ${que_sort[6]}\n8. ${que_sort[7]}\n9. ${que_sort[8]}\n10. ${que_sort[9]}\n`)},
      {name: "- 도우말 명령어",value: (`${prefix}명령어`)} ],
    timestamp: new Date(),}});
	}


}


////////////////////////////////////////////// 명령어 설명
else if (message.content === `${prefix}명령어`) {

	message.channel.send({embed: {
    color: 3447003,
    fields: [{
        name: "- 호가든봇 일반 명령어",
        value: "!등록\n!나가기\n!등록인원\n!맵\n!랜덤맵"
		}, {
		 name: "- 호가든봇 켑틴 명령어",
        value: "!선택 @유저이름"
		}, {
		 name: "- 호가든봇 오퍼이상 사용가능 명령어",
        value: "!매치재시작"
		}
	]
	}	
	});

}

////////////////////////////////////////////// 랜덤맵
else if (message.content === `${prefix}랜덤맵`) {
	

	message.channel.send({embed: {
    color: 3447003,
    fields: [{
        name: "- 랜덤맵",
        value: (random_map())
		},
	]
		
	}	
	});
}

////////////////////////////////////////////// 맵목록
else if (message.content === `${prefix}맵`) {

	message.channel.send({embed: {
		color: 3447003,
		fields: [{
        name: "- 맵 목록",
        value: (`${of_maps[0]}\n${of_maps[1]}\n${of_maps[2]}\n${of_maps[3]}\n${of_maps[4]}\n${of_maps[5]}\n${of_maps[6]}\n${of_maps[7]}\n${of_maps[8]}\n`)
		},
		]
	}	
	});
}

////////////////////////////////////////////// 상위권한 명령어(매치 재시작)
else if (message.content === `${prefix}매치재시작`) {
	
	if(message.member.roles.some(r=>["Operator", "스탭", "상담원"].includes(r.name)) ) {

	
		clear_que();
		message.channel.send({embed: {
		color: 3066993,
		fields: [{
        name: "- 매치가 재시작 되었습니다",
        value: (`내전에 참가하고 싶으신분은 다시 등록을 해주시기 바랍니다.`)
		},
		]
		}	
		});
	} 
	else{
	
		message.channel.send({embed: {
		color: 15158332,
		fields: [{
        name: "- 에러",
        value: (`권한이 없습니다.`)
		},
		]
		}	
		});
	
	}


}


else if (message.content.startsWith(`${prefix}선택`)) {

	cash=message.author
	var cash2 = message.mentions.users.first();


	if((pick_time==1)&&(game_mode==0)){
		if((pick_turn==0)&&(cash==(picked_user[0]))){ //청팀0, 주황팀1	
			for(for_count=0;for_count<=9;for_count++)
			{
				if(cash2==(username[for_count]))
				{
					picked_user[blue_count]=cash2;
					username[for_count]='';
					cash2=0;
					blue_count++;
					pick_turn++;
					break;
				}
				
			}
			if(cash2!=0)
				{
					//error 존재하지 않는 플레이어
					message.channel.send({embed: {
					color: 15158332,
					fields: [{
					name: "- 에러",
					value: (`참가목록에 없는 플레이어 입니다`)}
					]
					}	
					});
					
				}		
		}
			
			
		else if ((pick_turn==1)&&(cash==(picked_user[5])))
		{
			for(for_count=0;for_count<=9;for_count++)
			{
				if(cash2==(username[for_count]))
				{
					picked_user[red_count]=cash2;
					username[for_count]='';
					cash2=0;
					red_count++;
					pick_turn--;
					break;
				}
				
			}
			if(cash2!=0)
				{
					//error 존재하지 않는 플레이어
					message.channel.send({embed: {
					color: 15158332,
					fields: [{
					name: "- 에러",
					value: (`참가목록에 없는 플레이어 입니다`)}
					]
					}	
					});
					
				}

		
		}
		
		else if((cash==(picked_user[0]))&&(pick_turn==1))
			{
				//error 존재하지 않는 플레이어
					message.channel.send({embed: {
					color: 15158332,
					fields: [{
					name: "- 에러",
					value: (`청팀 캡틴 ${cash}님, 주황팀 캡틴에게 선택권이 있습니다.`)}
					]
					}	
					});
				
				
			}
		
		else if((cash==(picked_user[5]))&&(pick_turn==0))
			{
				//error 존재하지 않는 플레이어
					message.channel.send({embed: {
					color: 15158332,
					fields: [{
					name: "- 에러",
					value: (`주황팀 캡틴 ${cash}님, 청팀 캡틴에게 선택권이 있습니다.`)}
					]
					}	
					});	
			}
			
		else{
				//error 존재하지 않는 플레이어
					message.channel.send({embed: {
					color: 15158332,
					fields: [{
					name: "- 에러",
					value: (`무작위로 뽑힌 캡틴들에게만 선택권이 있습니다.`)}
					]
					}	
					});	
			}
		
		
		
		
		if(blue_count==5)
		{
			for(for_count=0;for_count<=9;for_count++)
			{
				if(username[for_count]!='')
				{
					picked_user[9]=username[for_count];		
					username[for_count]=''
					break;
				}
				
			}
			red_count++;
			pick_embed();
			message.channel.send(`**매치가 시작되었습니다** \n:small_blue_diamond:청팀: ${picked_user[0]} ${picked_user[1]} ${picked_user[2]} ${picked_user[3]} ${picked_user[4]} \n:small_orange_diamond:주황팀: ${picked_user[5]} ${picked_user[6]} ${picked_user[7]} ${picked_user[8]} ${picked_user[9]}\n\n 맵:${random_map()}`);
			clear_que();
		}
		else
		{
			pick_embed();
		}
		
		
	}
	else
	{
		
		//error 존재하지 않는 플레이어
		message.channel.send({embed: {
		color: 15158332,
		fields: [{
		name: "- 에러",
		value: (`선택의 시간이 아닙니다`)}
		]
		}	
		});
					
	}
}



////////////////////////////////////////////// 명령어외 에러출력
else if (message.content.startsWith(`${prefix}`))	{
	
		unknown_commend=1;
}



online_check1();
//오프라인 체크

});


client.on('message', async message => {
	
 
	if (message.content === `${prefix}게임모드`) {
		 
		if(message.member.roles.some(r=>["Operator", "스탭", "상담원"].includes(r.name)) ) {
			
			
			
			let msg = await message.channel.send({embed: {
						color: 3447003,
						fields: [{
						name: "- 게임모드",
						value: (`원하는 게임모드의 버튼을 누르세요 (기본값:내전 캡틴전)\n\n1. 내전 캡틴전\n2. 내전 랜덤전\n3. 내전 캡틴+랜덤오퍼전`)
						},
						]
						}	
						});
				await msg.react('1⃣');
				await msg.react('2⃣');
				await msg.react('3⃣');
		
				
			

			const filter = (reaction, user) => {
				//if(message.member.roles.some(r=>["Operator", "스탭"].includes(r.name)) ) {
					return ['1⃣', '2⃣', '3⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
				//}
			
			};

			msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
				.then(collected => {
					const reaction = collected.first();

					if (reaction.emoji.name === '1⃣') {
						message.channel.send({embed: {
						color: 3066993,
						fields: [{
						name: "- 게임모드가 변경되었습니다",
						value: (`현재 모드: 내전 캡틴전`)
						},
						]
						}	
						});
						game_mode=0;
					}
					else if (reaction.emoji.name === '2⃣'){
						message.channel.send({embed: {
						color: 3066993,
						fields: [{
						name: "- 게임모드가 변경되었습니다",
						value: (`현재 모드: 내전 랜덤전`)
						},
						]
						}	
						});
						game_mode=1;
					}
					else if (reaction.emoji.name === '3⃣'){
						message.channel.send({embed: {
						color: 3066993,
						fields: [{
						name: "- 게임모드가 변경되었습니다",
						value: (`현재 모드: 내전 캡틴+랜덤오퍼전`)
						},
						]
						}	
						});
						game_mode=2;
					}
				})
				
		}
		
		else
		{
			message.channel.send({embed: {
			color: 15158332,
			fields: [{
			name: "- 에러",
			value: (`권한이 없습니다. 게임모드 변경은 오퍼레이터 이상부터 가능합니다.`)}
			]
			}	
			});
			
		}
			
	}
	
	
	
	else if (message.content.startsWith(`${prefix}`))	{
		if(unknown_commend==1){
			//빨간 에러
			message.channel.send({embed: {
			color: 15158332,
			fields: [{
			name: "- 에러",
			value: (`알 수 없는 명령어입니다.`)},
			{name: "-도우말 명령어",value: "(!명령어)"}
			]
			}	
			});
		}
	}
	
	unknown_commend=0;
	
});


client.login(process.env.BOT_TOKEN);
