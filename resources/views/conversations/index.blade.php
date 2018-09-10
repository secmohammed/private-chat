@extends('layouts.app')

@section('content')
    @if (isset($conversation))
        <conversations-dashboard :id="{{ $conversation->id }}"></conversations-dashboard>
        {{-- expr --}}
    @else
        <conversations-dashboard></conversations-dashboard>
    @endif
@endsection
