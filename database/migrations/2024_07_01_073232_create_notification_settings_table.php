<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notification_settings', function (Blueprint $table) {
            $table->id();
            $table->string('from_name');
            $table->string('from_email');
            $table->boolean('mail_queue');
            $table->string('mail_driver');
            $table->string('mail_port');
            $table->string('mail_encryption');
            $table->string('mail_host');
            $table->string('mail_password');
            $table->string('mail_username');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notification_settings');
    }
};
