<?php

namespace App\Http\Controllers\Api;

use App\Conversation;
use App\Events\ConversationUsersAdded;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreConversationUserRequest;
use App\Transformers\ConversationTransformer;

class ConversationUserController extends Controller {
	public function __construct() {
		$this->middleware('auth');
	}
	public function store(StoreConversationUserRequest $request, Conversation $conversation) {
		$this->authorize('affect', $conversation);
		$conversation->users()->syncWithoutDetaching($request->recipients);
		//reload users.
		$conversation->load('users');
		broadcast(new ConversationUsersAdded($conversation))->toOthers();
		return fractal()
			->item($conversation)
			->parseIncludes(['user', 'users'])
			->transformWith(new ConversationTransformer)
			->toArray();

	}
}
