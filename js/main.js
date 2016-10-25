function maincontroller($scope, $rootScope) {
	$scope.attack = 0;
	$scope.boom = 0;
	$scope.protect = 0;
	$scope.count = 0;
	$scope.bosspercent = 0;
	$scope.zhennvlist = [];
	$scope.wangqielist = [];
	$scope.xinyanlist = [];
	$scope.poshilist = [];
	$scope.calulator = function() {
		var alldata = new main(parseInt($scope.attack), parseFloat($scope.boom), parseInt($scope.protect), parseInt($scope.count), parseInt($scope.bosspercent));
		$scope.zhennvall = alldata.ZhenNvCommonResult;
		$scope.zhennvlist = alldata.ZhenNvRealTimeResult;
		$scope.wangqieall = alldata.WangQieCommonResult;
		$scope.wangqielist = alldata.WangQieRealTimeResult;
		$scope.xinyanall = alldata.XinYanCommonResult;
		$scope.xinyanlist = alldata.XinYanRealTimeResult;
		$scope.poshiall = alldata.PoShiCommonResult;
		$scope.poshilist = alldata.PoShiRealTimeResult;
	}
}
var app = angular.module("calcultor", []);
app.filter('getall', function() {
	return function(list) {
		var all = 0;
		for (var i = 0; i < list.length; i++) {
			all = all + list[i];
		}
		return all;
	}
});

function main(Attack, Boom, Protect, Count, BossPercent) {
	this.ZhenNvCommonResult = (function() { //针女理论总伤害
		var _BoomCount = Boom * Count;
		var _HasBoom = _BoomCount * (Attack * 300 * 1.5 / (300 + Protect));
		var _NotHasBoom = (Count - _BoomCount) * Attack * 300 / (300 + Protect);
		var _HasZhenNv = _BoomCount * Attack * 0.5 * 1.2;
		return _HasBoom + _NotHasBoom + _HasZhenNv
	})();
	this.ZhenNvRealTimeResult = (function() { //针女分次伤害
		var _RankList = [];
		for (var i = 0; i < Count; i++) {
			var _BoomPre = Math.random();
			var _ZhenNvPre = Math.random();
			if (Boom > _BoomPre) { //判定为暴击
				if (_ZhenNvPre < 0.5) { //出针女
					var _Boomed = Attack * 300 * 1.5 / (300 + Protect);
					var _HasZhenNv = Attack * 1.2;
					_RankList.push(_HasZhenNv + _Boomed);
				} else {
					var _HasBoom = Attack * 300 * 1.5 / (300 + Protect);
					_RankList.push(_HasBoom);
				}
			} else {
				var _NotHasBoom = Attack * 300 / (300 + Protect);
				_RankList.push(_NotHasBoom);
			}
		}
		return _RankList;
	})();
	this.WangQieCommonResult = (function() {
		var _BoomCount = Boom * Count;
		var _HasBoom = _BoomCount * (Attack * 300 * 1.5 / (300 + Protect * 0.8));
		var _NotHasBoom = (Count - _BoomCount) * Attack * 300 / (300 + Protect);
		return _HasBoom + _NotHasBoom
	})();
	this.WangQieRealTimeResult = (function() {
		var _RankList = [];
		for (var i = 0; i < Count; i++) {
			var _BoomPre = Math.random();
			if (Boom > _BoomPre) { //判定为暴击
				var _HasBoom = Attack * 300 * 1.5 / (300 + Protect * 0.8);
				_RankList.push(_HasBoom);
			} else {
				var _NotHasBoom = Attack * 300 / (300 + Protect);
				_RankList.push(_NotHasBoom);
			}
		}
		return _RankList;
	})();
	this.XinYanCommonResult = (function() {
		if (BossPercent <= 30) { //触发
			var _BoomCount = Boom * Count;
			var _HasBoom = _BoomCount * (Attack * 300 * 1.5 * 1.5 / (300 + Protect));
			var _NotHasBoom = (Count - _BoomCount) * 1.5 * Attack * 300 / (300 + Protect);
			return _HasBoom + _NotHasBoom
		} else {
			var _BoomCount = Boom * Count;
			var _HasBoom = _BoomCount * (Attack * 300 * 1.5 / (300 + Protect));
			var _NotHasBoom = (Count - _BoomCount) * Attack * 300 / (300 + Protect);
			return _HasBoom + _NotHasBoom
		}
	})();
	this.XinYanRealTimeResult = (function() {
		if (BossPercent <= 30) { //触发
			var _RankList = [];
			for (var i = 0; i < Count; i++) {
				var _BoomPre = Math.random();
				if (Boom > _BoomPre) { //判定为暴击
					var _HasBoom = Attack * 300 * 1.5 * 1.5 / (300 + Protect);
					_RankList.push(_HasBoom);
				} else {
					var _NotHasBoom = Attack * 1.5 * 300 / (300 + Protect);
					_RankList.push(_NotHasBoom);
				}
			}
			return _RankList;
		} else {
			var _RankList = [];
			for (var i = 0; i < Count; i++) {
				var _BoomPre = Math.random();
				if (Boom > _BoomPre) { //判定为暴击
					var _HasBoom = Attack * 300 * 1.5 / (300 + Protect);
					_RankList.push(_HasBoom);
				} else {
					var _NotHasBoom = Attack * 300 / (300 + Protect);
					_RankList.push(_NotHasBoom);
				}
			}
			return _RankList;
		}
	})();
	this.PoShiCommonResult = (function() {
		if (BossPercent >= 70) { //触发
			var _BoomCount = Boom * Count;
			var _HasBoom = _BoomCount * (Attack * 300 * 1.5 * 1.4 / (300 + Protect));
			var _NotHasBoom = (Count - _BoomCount) * 1.4 * Attack * 300 / (300 + Protect);
			return _HasBoom + _NotHasBoom
		} else {
			var _BoomCount = Boom * Count;
			var _HasBoom = _BoomCount * (Attack * 300 * 1.5 / (300 + Protect));
			var _NotHasBoom = (Count - _BoomCount) * Attack * 300 / (300 + Protect);
			return _HasBoom + _NotHasBoom
		}
	})();
	this.PoShiRealTimeResult = (function() {
		if (BossPercent >= 70) { //触发
			var _RankList = [];
			for (var i = 0; i < Count; i++) {
				var _BoomPre = Math.random();
				if (Boom > _BoomPre) { //判定为暴击
					var _HasBoom = Attack * 300 * 1.4 * 1.5 / (300 + Protect);
					_RankList.push(_HasBoom);
				} else {
					var _NotHasBoom = Attack * 1.4 * 300 / (300 + Protect);
					_RankList.push(_NotHasBoom);
				}
			}
			return _RankList;
		} else {
			var _RankList = [];
			for (var i = 0; i < Count; i++) {
				var _BoomPre = Math.random();
				if (Boom > _BoomPre) { //判定为暴击
					var _HasBoom = Attack * 300 * 1.5 / (300 + Protect);
					_RankList.push(_HasBoom);
				} else {
					var _NotHasBoom = Attack * 300 / (300 + Protect);
					_RankList.push(_NotHasBoom);
				}
			}
			return _RankList;
		}
	})();
}
