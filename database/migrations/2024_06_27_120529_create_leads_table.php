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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('owner');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone');
            $table->string('second_phone');
            $table->string('invest');
            $table->string('first_trial');
            $table->string('second_trial');
            $table->string('followup');
            $table->string('source');
            $table->string('dnd');
            $table->string('city');
            $table->string('state');
            $table->string('product');
            $table->string('description');
            $table->string('kyc_status');
            $table->string('rp_status');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
