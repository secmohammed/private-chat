<?php
namespace App\Transformers;

use App\User;
use \League\Fractal\TransformerAbstract;

/**
 * summary
 */
class UserTransformer extends TransformerAbstract {
	public function transform(User $user) {
		$scope = $this->getCurrentScope()->getIdentifier();
		return [
			'id' => $user->id,
			'name' => $user->name,
			'avatar' => $user->avatar($scope == 'users' || $scope == 'parent.users' ? 25 : 45),
		];
	}
}
