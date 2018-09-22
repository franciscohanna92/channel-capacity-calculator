function calculateChannelCapacity(channelMatrix, arity) {
	let result = {};
	if(channelMatrix.length == 2) {
		result = getBinaryProbx(arity);
	}
	if(channelMatrix.length == 3) {
		result = getTernaryProbx(arity);
	}
	if(channelMatrix.length == 4) {
		result = getCuaternaryProbx(arity);
	}
	

	let HXY = calculateHXY(channelMatrix, result.probX, arity);
	return result.maxHY - HXY
}

function getBinaryProbx(arity) {
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
				tmpHY = calculateEntropy(multiplyMatrices(channelMatrix, tmpProbX), arity);
				if (tmpHY > maxHY) {
					maxHY = tmpHY
					probX = tmpProbX
				}
			}
		}
	}
	return {
		probX,
		maxHY
	}
}

function getTernaryProbx(arity) {
	let tmpProbX = [];
	let probX = [];
	let maxHY = 0;
	let tmpHY = 0;

	// Calculate X probabilties for maximum entropy in Y
	for (let i = 0.1; i <= 1; i += 0.1) {
		for (let j = 0.1; j <= 1; j += 0.1) {
			for (let k = 0.1; k <= 1; k += 0.1) {
				if (i + j + k == 1) {
					tmpProbX = [
						[i],
						[j],
						[k]
					]
					tmpHY = calculateEntropy(multiplyMatrices(channelMatrix, tmpProbX), arity);
					if (tmpHY > maxHY) {
						maxHY = tmpHY
						probX = tmpProbX
					}
				}
			}
		}
	}
	return {
		probX,
		maxHY
	}
}

function getCuaternaryProbx(arity) {
	let tmpProbX = [];
	let probX = [];
	let maxHY = 0;
	let tmpHY = 0;

	// Calculate X probabilties for maximum entropy in Y
	for (let i = 0.1; i <= 1; i += 0.1) {
		for (let j = 0.1; j <= 1; j += 0.1) {
			for (let k = 0.1; k <= 1; k += 0.1) {
				for (let l = 0.1; l <= 1; l += 0.1) {
					if (i + j + k + l == 1) {
						tmpProbX = [
							[i],
							[j],
							[k],
							[l]
						]
						tmpHY = calculateEntropy(multiplyMatrices(channelMatrix, tmpProbX), arity);
						if (tmpHY > maxHY) {
							maxHY = tmpHY
							probX = tmpProbX
						}
					}
				}
			}
		}
	}
	return {
		probX,
		maxHY
	}
}

function calculateHXY(channelMatrix, probX, arity) {
	let HXY = 0;
	for (let i = 0; i < probX.length; i++) {
		HXY += probX[i][0] * calculateEntropy(channelMatrix[i], arity);
	}

	return HXY;
}

function calculateEntropy(vector, arity) {
	let H = 0;
	for (let i = 0; i < vector.length; i++) {
		if (vector[i] != 0) {
			H += vector[i] * Math.log(1 / vector[i]) / Math.log(arity);
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