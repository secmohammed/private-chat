<?php

use Faker\Generator as Faker;

$factory->define(App\Conversation::class, function (Faker $faker) {
	$users_id = App\User::pluck('id');
	return [
		'user_id' => $faker->randomElement($users_id),
		'body' => $faker->sentence,
	];
});
$factory->afterCreating(App\Conversation::class, function ($conversation, $faker) {
	$users_id = App\User::limit(2)->pluck('id');
	$conversation->users()->attach($users_id);
});