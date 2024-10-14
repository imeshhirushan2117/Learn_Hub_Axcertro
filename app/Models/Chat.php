<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    
    /**
     * fillable
     *
     * @var array
     */


     protected $table = 'chats';

    protected $fillable = [
        'teacher_id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class,'teacher_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
