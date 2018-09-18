function calculateChannelCapacity(channelMatrix) {
	let tmpProbX = [];
	let probX = [];
	let maxHY = 0;
	let tmpHY = 0;

	// Calculate X probabilties for maximum entropy in Y
	for (let i = 0.1; i <= 1; i += 0.1) {
		for (let j = 0.1; j <= 1; j += 0.1) {
			if (i + j == 1) {
				tmpProbX = [
					[i],
					[j]
				]
				tmpHY = calculateEntropy(multiplyMatrices(channelMatrix, tmpProbX));
				if (tmpHY > maxHY) {
					maxHY = tmpHY
					probX = tmpProbX
				}
			}
		}
	}

	let HXY = calculateHXY(channelMatrix, probX);
	return maxHY - HXY
}

function calculateHXY(channelMatrix, probX) {
	let HXY = 0;
	for (let i = 0; i < probX.length; i++) {
		HXY += probX[i][0] * calculateEntropy(channelMatrix[i]);
	}

	return HXY;
}

function calculateEntropy(vector) {
	let H = 0;
	for (let i = 0; i < vector.length; i++) {
		if (vector[i] != 0) {
			H += vector[i] * Math.log2(1 / vector[i]);
		}

	}
	return H;
}

function multiplyMatrices(m1, m2) {
	var result = [];
	for (var i = 0; i < m1.length; i++) {
		result[i] = [];
		for (var j = 0; j < m2[0].length; j++) {
			var sum = 0;
			for (var k = 0; k < m1[0].length; k++) {
				sum += m1[i][k] * m2[k][j];
			}
			result[i][j] = sum;
		}
	}
	return result;
}