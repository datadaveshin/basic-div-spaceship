{
  const canvasWidth = 600;
  const canvasHeight = 400;

  const shipContainerWidth = 10;
  const shipContainerHeight = 40;

  const rotationMultiplier = 3;
  const translateMultiplier = 5;

  let shipRotDeg = 0;
  let shipPosX = canvasWidth / 2;
  let shipPosY = canvasHeight / 2;

  let canvas = document.getElementById('canvas');
  let shipContainer = document.getElementById('ship-container');
  let shipBody = document.getElementById('ship-body');
  let shipFlame = document.getElementById('ship-flame');

  let keyLogger = document.getElementById('key-log');
  let degreeLogger = document.getElementById('degree-log');
  let xPosLogger = document.getElementById('x-log');
  let yPosLogger = document.getElementById('y-log');

  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  shipBodyWidth = shipContainerWidth;
  shipBodyHeight = shipContainerHeight * 0.80;
  shipFlameWidth = shipContainerWidth / 4;
  shipFlameHeight = shipContainerHeight / 6;

  shipContainer.style.width = `${shipContainerWidth}px`;
  shipContainer.style.height = `${shipContainerHeight}px`;
  shipBody.style.width = `${shipBodyWidth}px`;
  shipBody.style.height = `${shipBodyHeight}px`;
  shipFlame.style.width = `${shipFlameWidth}px`;
  shipFlame.style.height = `${shipFlameHeight}px`

  shipContainer.style.left = `${shipPosX}px`;
  shipContainer.style.top = `${shipPosY}px`;

  const translate = (axis, deg) => {
    if (axis == "X" || axis == "x") {
      return -Math.cos((deg + 90) * Math.PI / 180);
    }
    if (axis == "Y" || axis == "y") {
      return -Math.sin((deg + 90) * Math.PI / 180);
    }
  }

  const moveShip = (e) => {
    if (e.code == "ArrowRight") {
      shipRotDeg += rotationMultiplier;
    } else if (e.code == "ArrowLeft") {
      shipRotDeg -= rotationMultiplier;
    } else if (e.code == "ArrowDown") {
      shipPosX += translate("X", shipRotDeg) * translateMultiplier;
      shipPosY += translate("Y", shipRotDeg) * translateMultiplier;
      shipFlame.style.visibility = "visible";
      setTimeout( () => {
        shipFlame.style.visibility = "hidden";
      }, 10);
    }

    if (shipRotDeg < 0) {
      shipRotDeg = 360 - rotationMultiplier;
    }
    shipRotDeg %= 360;

    if (shipPosX <= Math.floor(shipContainerHeight / 4)) {
      shipPosX = Math.floor(canvasWidth - (shipContainerHeight / 2));
    } else if (shipPosX > Math.floor(canvasWidth - (shipContainerHeight / 2))) {
      shipPosX = Math.floor(shipContainerHeight / 4);
    }

    if (shipPosY < 0) {
      shipPosY = Math.floor(canvasHeight - shipContainerHeight);
    } else if (shipPosY > Math.floor(canvasHeight - shipContainerHeight)) {
      shipPosY = 0;
    }

    shipContainer.style.transform = `rotate(${shipRotDeg}deg)`;
    shipContainer.style.left = `${shipPosX}px`;
    shipContainer.style.top = `${shipPosY}px`;

    keyLogger.innerHTML = `Key: ${e.code}`;
    degreeLogger.innerHTML = `Rotation degrees: ${shipRotDeg}<sup>o</sup>`;
    xPosLogger.innerHTML = `X position: ${Math.floor(shipPosX)}px`;
    yPosLogger.innerHTML = `Y position: ${Math.floor(shipPosY)}px`;
  }

  document.addEventListener('keydown', moveShip);
}
