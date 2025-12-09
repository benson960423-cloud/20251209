// ========== 角色配置開始 ==========
// 【說明】修改此區段中的參數以替換角色
// 每個精靈圖表應該是水平排列的，所有幀的尺寸相同

// 角色1 配置 (攻擊者 - 例如 Ryu)
const CHARACTER1_CONFIG = {
  stop: { width: 1955, height: 212, frames: 14 },
  walk: { width: 1246, height: 198, frames: 9 },
  jump: { width: 1913, height: 188, frames: 14 },
  push: { width: 1039, height: 146, frames: 4 },
  tool: { width: 740, height: 19, frames: 5 }
};

// 角色2 配置 (互動者 - 例如 Chun-Li)
const CHARACTER2_CONFIG = {
  stop: { width: 699, height: 190, frames: 8 },
  smile: { width: 585, height: 183, frames: 5 },
  fall_down: { width: 2712, height: 156, frames: 11 }
};

// 精靈圖表載入
let spriteSheet;
let spriteSheet2;
let walkSheet;
let jumpSheet;
let pushSheet;
let smileSheet2;
let fallDownSheet2;
let toolSheet;

// 動畫陣列
let animation = [];
let animation2 = [];
let walkAnimation = [];
let jumpAnimation = [];
let pushAnimation = [];
let smileAnimation2 = [];
let fallDownAnimation2 = [];
let toolAnimation = [];

// 角色1 精靈參數（從配置自動設置）
let spriteWidth = CHARACTER1_CONFIG.stop.width;
let spriteHeight = CHARACTER1_CONFIG.stop.height;
let numFrames = CHARACTER1_CONFIG.stop.frames;
let frameWidth;

let walkSpriteWidth = CHARACTER1_CONFIG.walk.width;
let walkSpriteHeight = CHARACTER1_CONFIG.walk.height;
let walkNumFrames = CHARACTER1_CONFIG.walk.frames;
let walkFrameWidth;

let jumpSpriteWidth = CHARACTER1_CONFIG.jump.width;
let jumpSpriteHeight = CHARACTER1_CONFIG.jump.height;
let jumpNumFrames = CHARACTER1_CONFIG.jump.frames;
let jumpFrameWidth;

let pushSpriteWidth = CHARACTER1_CONFIG.push.width;
let pushSpriteHeight = CHARACTER1_CONFIG.push.height;
let pushNumFrames = CHARACTER1_CONFIG.push.frames;
let pushFrameWidth;

let toolSpriteWidth = CHARACTER1_CONFIG.tool.width;
let toolSpriteHeight = CHARACTER1_CONFIG.tool.height;
let toolNumFrames = CHARACTER1_CONFIG.tool.frames;
let toolFrameWidth;

// 角色2 精靈參數（從配置自動設置）
let spriteWidth2 = CHARACTER2_CONFIG.stop.width;
let spriteHeight2 = CHARACTER2_CONFIG.stop.height;
let numFrames2 = CHARACTER2_CONFIG.stop.frames;
let frameWidth2;

let smileSpriteWidth2 = CHARACTER2_CONFIG.smile.width;
let smileSpriteHeight2 = CHARACTER2_CONFIG.smile.height;
let smileNumFrames2 = CHARACTER2_CONFIG.smile.frames;
let smileFrameWidth2;

let fallDownSpriteWidth2 = CHARACTER2_CONFIG.fall_down.width;
let fallDownSpriteHeight2 = CHARACTER2_CONFIG.fall_down.height;
let fallDownNumFrames2 = CHARACTER2_CONFIG.fall_down.frames;
let fallDownFrameWidth2;

// ========== 角色配置結束 ==========
// 是否使用程序化角色（不需外部精靈圖）
let useProceduralCharacters = true; // 設為 true 使用內建簡易角色繪製

// 程序化角色繪製函式（簡單像素風替代圖）
function drawCharacter1(state, x, y, facing, animFrame) {
  push();
  translate(x, y);
  if (facing === -1) scale(-1, 1);

  // 身體
  rectMode(CENTER);
  noStroke();
  fill(40, 120, 200); // 衣服顏色
  rect(0, 0, 46, 64, 6);

  // 頭
  fill(240, 200, 170);
  ellipse(0, -44, 28, 28);

  // 手臂
  stroke(30);
  strokeWeight(6);
  line(-26, -10, -44, 6);
  line(26, -10, 44, 6);

  // 腿（走路時擺動）
  strokeWeight(8);
  if (state === 'walk') {
    let t = animFrame * 0.4;
    line(-10, 34, -10, 34 + 12 * sin(t));
    line(10, 34, 10, 34 - 12 * sin(t));
  } else if (state === 'jump') {
    line(-12, 34, -12, 50);
    line(12, 34, 12, 20);
  } else if (state === 'push') {
    line(-10, 34, -10, 48);
    line(10, 34, 10, 48);
  } else {
    line(-10, 34, -10, 48);
    line(10, 34, 10, 48);
  }

  // 簡單武器效果
  if (state === 'tool') {
    noStroke();
    fill(255, 180, 0);
    ellipse(60 * (facing || 1), -10, 12, 12);
  }

  pop();
}

function drawCharacter2(state, x, y, facing, animFrame) {
  push();
  translate(x, y);
  if (facing === -1) scale(-1, 1);

  // 身體
  rectMode(CENTER);
  noStroke();
  fill(200, 80, 120); // 衣服顏色
  rect(0, 0, 42, 60, 6);

  // 頭
  fill(245, 210, 180);
  ellipse(0, -42, 26, 26);

  // 手臂
  stroke(30);
  strokeWeight(5);
  line(-22, -8, -36, 8);
  line(22, -8, 36, 8);

  // 腿與動作
  strokeWeight(7);
  if (state === 'smile') {
    line(-10, 34, -10, 48);
    line(10, 34, 10, 48);
  } else if (state === 'fall_down') {
    rotate(PI / 2.5);
    rect(0, 0, 60, 36, 6);
    pop();
    return;
  } else {
    line(-10, 34, -10, 48);
    line(10, 34, 10, 48);
  }

  // 表情 (微笑)
  if (state === 'smile') {
    noStroke();
    fill(0);
    ellipse(-5, -46, 3, 3);
    ellipse(5, -46, 3, 3);
    stroke(0);
    strokeWeight(2);
    line(-4, -36, 4, -36);
  }

  pop();
}

function drawProjectile(x, y, direction) {
  push();
  translate(x, y);
  noStroke();
  fill(255, 200, 0);
  ellipse(0, 0, 14, 8);
  pop();
}

let currentFrame2 = 0;
let currentFrame = 0;
let walkCurrentFrame = 0;
let jumpCurrentFrame = 0;
let pushCurrentFrame = 0;
let smileCurrentFrame2 = 0;
let fallDownCurrentFrame2 = 0;
let animationSpeed = 0.1; // 調整這個值可以改變動畫速度，數字越小越慢
let walkAnimationSpeed = 0.2;
let jumpAnimationSpeed = 0.3;
let pushAnimationSpeed = 0.15;
let smileAnimationSpeed2 = 0.1;
let fallDownAnimationSpeed2 = 0.2;
let animationSpeed2 = 0.1;
let toolAnimationSpeed = 0.3;

// 角色位置與移動速度
let characterX;
let characterY;
let character2X;
let character2Y;
let moveSpeed = 5;

// 角色狀態
let isJumping = false;
let jumpHeight = 150; // 角色跳躍的高度
let facingDirection = 1; // 角色面向的方向: 1=右, -1=左
let isPushing = false;
let isSmiling2 = false; // 角色2是否在微笑
let isFallingDown2 = false; // 角色2是否在倒下
let proximityThreshold = 200; // 觸發互動的距離
let projectileHitThreshold = 100; // 飛行道具擊中判定距離
let recoveryThreshold = 150; // 角色1靠近觸發恢復的距離
let hasFired = false; // 確保每次攻擊只發射一次

// 飛行道具陣列，可以管理多個道具
let projectiles = [];

// DOM 元素與對話管理
let nameInput;
let character2Dialogue = "請問你叫甚麼名字";
let dialogueStep = 0; // 0: 初始, 1: 正在輸入, 2: 已回答

// CSV 題庫管理
let questionData = []; // 存儲 CSV 資料
let currentQuestion = null; // 當前題目

function preload() {
  // 在 preload 函式中載入圖片，確保在 setup() 開始前圖片已完全載入
  // p5.js 會從 index.html 檔案的位置去尋找相對路徑
  spriteSheet = loadImage('1/stop/stop.png');
  spriteSheet2 = loadImage('2/stop/stop_2.png');
  walkSheet = loadImage('1/walk/walk.png');
  jumpSheet = loadImage('1/jump/jump.png');
  pushSheet = loadImage('1/push/push.png');
  smileSheet2 = loadImage('2/smile/smile_2.png');
  fallDownSheet2 = loadImage('2/fall_down/fall_down_2.png');
  toolSheet = loadImage('1/tool/tool.png');
  
  // 載入 CSV 題庫
  questionData = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  // 建立一個佔滿整個瀏覽器視窗的畫布
  createCanvas(windowWidth, windowHeight);

  // 計算單一畫格的寬度
  frameWidth = spriteWidth / numFrames;

  // 從圖片精靈中切割出每一幀並存入 animation 陣列
  for (let i = 0; i < numFrames; i++) {
    let frame = spriteSheet.get(i * frameWidth, 0, frameWidth, spriteHeight);
    animation.push(frame);
  }

  // 計算新角色動畫單一畫格的寬度並存入陣列
  frameWidth2 = spriteWidth2 / numFrames2;
  for (let i = 0; i < numFrames2; i++) {
    let frame = spriteSheet2.get(i * frameWidth2, 0, frameWidth2, spriteHeight2);
    animation2.push(frame);
  }
  
  // 計算微笑動畫單一畫格的寬度並存入陣列
  smileFrameWidth2 = smileSpriteWidth2 / smileNumFrames2;
  for (let i = 0; i < smileNumFrames2; i++) {
    let frame = smileSheet2.get(i * smileFrameWidth2, 0, smileFrameWidth2, smileSpriteHeight2);
    smileAnimation2.push(frame);
  }

  // 計算倒下動畫單一畫格的寬度並存入陣列
  fallDownFrameWidth2 = fallDownSpriteWidth2 / fallDownNumFrames2;
  for (let i = 0; i < fallDownNumFrames2; i++) {
    let frame = fallDownSheet2.get(i * fallDownFrameWidth2, 0, fallDownFrameWidth2, fallDownSpriteHeight2);
    fallDownAnimation2.push(frame);
  }

  // 計算走路動畫單一畫格的寬度並存入陣列
  walkFrameWidth = walkSpriteWidth / walkNumFrames;
  for (let i = 0; i < walkNumFrames; i++) {
    let frame = walkSheet.get(i * walkFrameWidth, 0, walkFrameWidth, walkSpriteHeight);
    walkAnimation.push(frame);
  }

  // 計算跳躍動畫單一畫格的寬度並存入陣列
  jumpFrameWidth = jumpSpriteWidth / jumpNumFrames;
  for (let i = 0; i < jumpNumFrames; i++) {
    let frame = jumpSheet.get(i * jumpFrameWidth, 0, jumpFrameWidth, jumpSpriteHeight);
    jumpAnimation.push(frame);
  }

  // 計算攻擊動畫單一畫格的寬度並存入陣列
  pushFrameWidth = pushSpriteWidth / pushNumFrames;
  for (let i = 0; i < pushNumFrames; i++) {
    let frame = pushSheet.get(i * pushFrameWidth, 0, pushFrameWidth, pushSpriteHeight);
    pushAnimation.push(frame);
  }

  // 計算飛行道具動畫單一畫格的寬度並存入陣列
  toolFrameWidth = toolSpriteWidth / toolNumFrames;
  for (let i = 0; i < toolNumFrames; i++) {
    let frame = toolSheet.get(i * toolFrameWidth, 0, toolFrameWidth, toolSpriteHeight);
    toolAnimation.push(frame);
  }

  // 設定圖片繪製模式為中心點對齊，方便將圖片置中
  imageMode(CENTER);

  // 初始化角色位置在畫布中央
  characterX = width / 2;
  characterY = height / 2;

  // 初始化新角色的位置在原本角色的左邊
  character2X = characterX - 200;
  character2Y = height / 2;

  // --- 建立輸入框 ---
  nameInput = createInput(); // 建立 HTML 輸入框
  nameInput.position(-width, -height); // 先將其藏在畫面外
  nameInput.size(150, 20);
  nameInput.changed(handleNameInput); // 綁定 Enter 事件
}

function draw() {
  // 設定畫布背景顏色
  background('#bde0fe');

  // 處理並繪製所有飛行道具
  // 從後往前遍歷，方便安全地從陣列中移除元素
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let p = projectiles[i];
    p.x += p.speed * p.direction;
    
    if (useProceduralCharacters) {
      drawProjectile(p.x, p.y, p.direction);
    } else {
      if (p.direction === 1) {
        image(toolAnimation[floor(p.currentFrame)], p.x, p.y);
      } else {
        push();
        translate(p.x, p.y);
        scale(-1, 1);
        image(toolAnimation[floor(p.currentFrame)], 0, 0);
        pop();
      }
    }
    
    // --- 飛行道具碰撞偵測 ---
    let projectileDistance = dist(p.x, p.y, character2X, character2Y);
    if (projectileDistance < projectileHitThreshold && !isFallingDown2) {
      isFallingDown2 = true; // 觸發倒下
      isSmiling2 = false; // 停止微笑
      dialogueStep = 0; // 重置對話
      nameInput.position(-width, -height); // 隱藏輸入框
      fallDownCurrentFrame2 = 0; // 從第一幀開始播放
      projectiles.splice(i, 1); // 移除擊中的飛行道具
      continue; // 繼續下一個迴圈，避免後續的越界判斷
    }

    p.currentFrame = (p.currentFrame + toolAnimationSpeed) % toolNumFrames;

    // 如果飛行道具完全離開畫布的可視範圍，就將其從陣列中移除
    // 判斷條件為：物件中心點 超出 畫布邊界 + 物件寬度的一半
    if (p.x > width + (toolFrameWidth / 2) || p.x < -(toolFrameWidth / 2)) {
      projectiles.splice(i, 1);
    }
  }

  // --- 角色2互動邏輯 ---
  // 計算兩個角色之間的距離
  let d = dist(characterX, characterY, character2X, character2Y);

  // 如果角色1進入範圍，且不在互動中，則觸發互動
  if (d < proximityThreshold && dialogueStep === 0) {
    isSmiling2 = true;
    smileCurrentFrame2 = 0; // 從第一幀開始播放
    dialogueStep = 1; // 進入輸入步驟
    
    // 從 CSV 隨機選擇一個題目
    if (questionData && questionData.getRowCount() > 0) {
      let randomIndex = floor(random(questionData.getRowCount()));
      currentQuestion = questionData.getRow(randomIndex);
      character2Dialogue = currentQuestion.getString('題目'); // 顯示 CSV 中的題目
    }
    
    nameInput.position(characterX - 75, characterY - 120); // 顯示輸入框在角色1頭上
  }

  // --- 繪製新角色 ---
  if (isFallingDown2) {
    // 播放倒下動畫
    if (useProceduralCharacters) {
      // 程序化倒下繪製
      let facing2 = characterX < character2X ? -1 : 1;
      drawCharacter2('fall_down', character2X, character2Y, facing2, fallDownCurrentFrame2);
    } else {
      push();
      translate(character2X, character2Y);
      // 根據角色1的位置決定倒下時的朝向
      if (characterX < character2X) {
        scale(-1, 1);
      }
      image(fallDownAnimation2[floor(fallDownCurrentFrame2)], 0, 0);
      pop();
    }

    // 動畫播放一次後停在最後一幀
    if (fallDownCurrentFrame2 < fallDownNumFrames2 - 1) {
      fallDownCurrentFrame2 += fallDownAnimationSpeed2;
    }

    // 如果角色1靠近，則恢復
    if (d < recoveryThreshold) {
      isFallingDown2 = false;
    }
  } else if (isSmiling2) {
    // 播放微笑動畫
    if (useProceduralCharacters) {
      let facing2 = characterX < character2X ? -1 : 1;
      drawCharacter2('smile', character2X, character2Y, facing2, smileCurrentFrame2);
    } else {
      push();
      translate(character2X, character2Y);
      // 根據角色1的位置決定微笑時的朝向
      if (characterX < character2X) {
        scale(-1, 1);
      }
      image(smileAnimation2[floor(smileCurrentFrame2)], 0, 0);
      pop();
    }

    // 持續播放微笑動畫
    smileCurrentFrame2 = (smileCurrentFrame2 + smileAnimationSpeed2);
    // 如果動畫播完，就停在最後一幀
    if (smileCurrentFrame2 >= smileNumFrames2) smileCurrentFrame2 = smileNumFrames2 - 1;

    // --- 在角色2上方顯示對話框 ---
    push(); // 儲存當前的繪圖設定
    let dialogue = character2Dialogue;
    let textPadding = 10;
    let boxWidth = textWidth(dialogue) + textPadding * 2;
    let boxHeight = 30;
    let boxX = character2X - boxWidth / 2;
    // 將對話框定位在角色頭頂上方
    let boxY = character2Y - (smileSpriteHeight2 / 2) - boxHeight - 10;

    fill(255, 255, 255, 220); // 半透明白色背景
    stroke(0); // 黑色邊框
    rect(boxX, boxY, boxWidth, boxHeight, 5); // 繪製圓角矩形

    fill(0); // 黑色文字
    noStroke(); // 文字不需要邊框
    textAlign(CENTER, CENTER); // 文字置中對齊
    text(dialogue, boxX + boxWidth / 2, boxY + boxHeight / 2);
    pop(); // 恢復原本的繪圖設定

    // 如果玩家已輸入完畢且移開，則重置對話
    if (d >= proximityThreshold) {
      isSmiling2 = false;
      dialogueStep = 0;
      character2Dialogue = "請問你叫甚麼名字";
      currentQuestion = null; // 清除當前題目
      nameInput.position(-width, -height); // 當角色1遠離時，隱藏輸入框
    }
  } else {
    // 播放待機動畫，並根據角色1位置轉向
    if (useProceduralCharacters) {
      let facing2 = characterX < character2X ? -1 : 1;
      drawCharacter2('idle', character2X, character2Y, facing2, currentFrame2);
    } else {
      if (characterX < character2X) {
        // 角色1在左邊，角色2朝左
        push();
        translate(character2X, character2Y);
        scale(-1, 1); // 水平翻轉
        image(animation2[floor(currentFrame2)], 0, 0);
        pop();
      } else {
        // 角色1在右邊，角色2恢復正常朝向 (朝右)
        image(animation2[floor(currentFrame2)], character2X, character2Y);
      }
    }
    // 更新待機動畫的畫格
    currentFrame2 = (currentFrame2 + animationSpeed2) % numFrames2;
  }

  // 優先處理跳躍狀態
  if (isPushing) {
    // 播放攻擊動畫
    if (useProceduralCharacters) {
      drawCharacter1('push', characterX, characterY, facingDirection, pushCurrentFrame);
    } else {
      if (facingDirection === 1) {
        image(pushAnimation[floor(pushCurrentFrame)], characterX, characterY);
      } else {
        push();
        translate(characterX, characterY);
        scale(-1, 1);
        image(pushAnimation[floor(pushCurrentFrame)], 0, 0);
        pop();
      }
    }

    pushCurrentFrame += pushAnimationSpeed;

    // 在動畫的特定幀產生飛行道具
    if (floor(pushCurrentFrame) === 3 && !hasFired) {
      let newProjectile = {
        x: characterX + (50 * facingDirection), // 在角色前方產生
        y: characterY - 20, // 調整Y軸位置
        direction: facingDirection,
        speed: 12,
        currentFrame: 0
      };
      projectiles.push(newProjectile); // 將新道具加入陣列
      hasFired = true; // 標記本次攻擊已發射
    }

    // 動畫結束後，返回待機
    if (pushCurrentFrame >= pushNumFrames) {
      isPushing = false;
      pushCurrentFrame = 0;
    }
  } else if (isJumping) {
    // 根據目前播放的畫格計算 Y 軸位移，形成拋物線
    let jumpProgress = jumpCurrentFrame / (jumpNumFrames -1); // 0 到 1 的進度
    let currentJumpHeight = sin(jumpProgress * PI) * jumpHeight;
    let yPos = characterY - currentJumpHeight;

    // 根據角色方向繪製跳躍動畫
    if (useProceduralCharacters) {
      drawCharacter1('jump', characterX, yPos, facingDirection, jumpCurrentFrame);
    } else {
      if (facingDirection === 1) {
        // 面向右
        image(jumpAnimation[floor(jumpCurrentFrame)], characterX, yPos);
      } else {
        // 面向左，翻轉圖片
        push();
        translate(characterX, yPos);
        scale(-1, 1);
        image(jumpAnimation[floor(jumpCurrentFrame)], 0, 0);
        pop();
      }
    }

    // 更新跳躍動畫畫格
    jumpCurrentFrame += jumpAnimationSpeed;

    // 如果動畫播放完畢
    if (jumpCurrentFrame >= jumpNumFrames) {
      isJumping = false; // 結束跳躍狀態
      jumpCurrentFrame = 0; // 重置畫格計數器
    }
  } else {
    // 非跳躍狀態下，檢查左右移動
    if (keyIsDown(RIGHT_ARROW)) {
      facingDirection = 1; // 更新方向為右
      // 更新角色位置
      characterX += moveSpeed;
      // 顯示走路動畫
      if (useProceduralCharacters) {
        drawCharacter1('walk', characterX, characterY, facingDirection, walkCurrentFrame);
      } else {
        image(walkAnimation[floor(walkCurrentFrame)], characterX, characterY);
      }
      // 更新走路動畫的畫格
      walkCurrentFrame = (walkCurrentFrame + walkAnimationSpeed) % walkNumFrames;
    } else if (keyIsDown(LEFT_ARROW)) {
      facingDirection = -1; // 更新方向為左
      // 更新角色位置
      characterX -= moveSpeed;
      
      // 透過 translate 和 scale(-1, 1) 來水平翻轉圖片
      if (useProceduralCharacters) {
        // 直接以程序化函式繪製（函式會自己處理朝向）
        drawCharacter1('walk', characterX, characterY, facingDirection, walkCurrentFrame);
      } else {
        push(); // 儲存目前的繪圖設定
        translate(characterX, characterY); // 將原點移動到角色位置
        scale(-1, 1); // 水平翻轉座標系
        image(walkAnimation[floor(walkCurrentFrame)], 0, 0); // 在新的原點繪製圖片
        pop(); // 恢復原本的繪圖設定
      }

      // 更新走路動畫的畫格
      walkCurrentFrame = (walkCurrentFrame + walkAnimationSpeed) % walkNumFrames;
    } else {
      // 顯示待機動畫
      if (useProceduralCharacters) {
        drawCharacter1('idle', characterX, characterY, facingDirection, currentFrame);
      } else {
        image(animation[floor(currentFrame)], characterX, characterY);
      }
      // 更新待機動畫的畫格
      currentFrame = (currentFrame + animationSpeed) % numFrames;
    }
  }
}

// 當瀏覽器視窗大小改變時，自動調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// 偵測單次按鍵事件來觸發跳躍
function keyPressed() {
  if (keyCode === UP_ARROW && !isJumping) {
    isJumping = true;
  } else if (keyCode === DOWN_ARROW && !isJumping && !isPushing) { // DOWN_ARROW 是往下鍵
    isPushing = true;
    hasFired = false; // 重置發射旗標
  }
}

// 處理玩家名稱輸入的函式
function handleNameInput() {
  let playerName = nameInput.value();
  character2Dialogue = playerName + "，歡迎你。";
  nameInput.value(''); // 清空輸入框
  nameInput.position(-width, -height); // 再次隱藏輸入框
  dialogueStep = 2; // 更新對話狀態為已回答
}
