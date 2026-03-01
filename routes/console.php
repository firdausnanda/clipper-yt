<?php

use App\Jobs\PollVizardProjects;
use Illuminate\Support\Facades\Schedule;

Schedule::job(new PollVizardProjects)->everyThirtySeconds();
