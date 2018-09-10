<?php

namespace App\Events;

use App\Conversation;
use App\Transformers\ConversationTransformer;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;

class ConversationUsersAdded implements ShouldBroadcast {
	use Dispatchable, InteractsWithSockets;
	public $conversation;
	/**
	 * Create a new event instance.
	 *
	 * @return void
	 */
	public function __construct(Conversation $conversation) {
		$this->conversation = $conversation;
	}

	/**
	 * Get the channels the event should broadcast on.
	 *
	 * @return \Illuminate\Broadcasting\Channel|array
	 */
	public function broadcastOn() {
		$channels = [
			new PrivateChannel('conversation.' . $this->conversation->id),
		];
		$this->conversation->usersExceptCurrentlyAuthenticated->each(function ($user) use (&$channels) {
			$channels[] = new PrivateChannel('user.' . $user->id);
		});
		return $channels;
	}
	public function broadcastWith() {
		return fractal()
			->item($this->conversation)
			//user who replied, then the rest is parent conversation
			->parseIncludes(['user', 'users'])
			->transformWith(new ConversationTransformer)
			->toArray();

	}
}
