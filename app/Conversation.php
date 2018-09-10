<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model {
	protected $guarded = ['id'];
	protected $dates = [
		'last_reply',
	];
	public function user() {
		return $this->belongsTo(User::class);
	}
	public function users() {
		return $this->belongsToMany(User::class);
	}
	public function usersExceptCurrentlyAuthenticated() {
		return $this->users()->where('user_id', '!=', auth()->id());
	}
	public function replies() {
		return $this->hasMany(Conversation::class, 'parent_id')->latestFirst();
	}
	public function isReply() {
		return !!$this->parent_id;
	}
	public function parent() {
		return $this->belongsTo(Conversation::class)->whereNull('parent_id');
	}
	public function touchLastReply() {
		$this->last_reply = \Carbon\Carbon::now();
		$this->save();
	}
	public function scopeLatestFirst($query) {
		return $query->orderBy('created_at', 'desc');
	}
}
