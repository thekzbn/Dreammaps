<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdditionalDetailsCompletedMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user()->skillsCompleted()) {
            return redirect()->route('onboarding.select-skills');
        }

        if (!$request->user()->additionalDetailsCompleted()) {
            return redirect()->route('onboarding.additional-details');
        }

        return $next($request);
    }
}
