<?php

namespace App\Http\Controllers;

use App\Conversation;

class ConversationController extends Controller {
	public function index() {
		return view('conversations.index');
	}
	public function show(Conversation $conversation) {

		return view('conversations.index', compact('conversation'));
	}
}
