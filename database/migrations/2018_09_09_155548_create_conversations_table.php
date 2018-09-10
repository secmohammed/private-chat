<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConversationsTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('conversations', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('user_id')->unsigned();
			$table->integer('parent_id')->unsigned()->nullable();
			$table->text('body');
			$table->timestamp('last_reply')->nullable();
			$table->timestamps();
		});
		Schema::create('conversation_user', function (Blueprint $table) {
			$table->unsignedInteger('conversation_id');
			$table->unsignedInteger('user_id');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('conversations');
		Schema::dropIfExists('conversation_user');
	}
}
