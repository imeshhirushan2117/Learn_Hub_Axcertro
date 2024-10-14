<?php

namespace App\Http\Controllers\StudentsArea\Service;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Repositories\All\Services\ServiceInterface;
use App\Http\Controllers\Teacher;
use App\Repositories\All\Teachers\TeacherInterface;


class StudentServiceController extends Controller
{
    public function __construct(protected ServiceInterface $serviceInterface, protected TeacherInterface $teacherInterface){}
    /**
     * Display a listing of the resource.
     */
       
    public function index(Request $request)
    {    
        $filters = $request->all();
        $services = $this->serviceInterface->getByColumn(['status' => 'approved'],['*'], ['teacher.user']);
        foreach ($services as $service) {
            $service->average_rating = $service->getAverageRatingAttribute();
        }

        return Inertia::render('StudentArea/Service/All/Index', [
            'services' => $services,
            'teachersCount' => $this->teacherInterface->all()->count(),
            'filters' => $filters,
        ]);
        
    }


    public function search(Request $request)
    {
        $search = $request->input('search');
        $services = $this->serviceInterface->all()->load('teacher');

        if ($search) {
            $services = $services->filter(function ($service) use ($search) {
                return stripos($service->name, $search) !== false ||
                    stripos(optional($service->teacher)->tname, $search) !== false ||
                    stripos((string)$service->hourly_rate, $search) !== false;
            });
        }

        $serviceCount = $services->count();
        return Inertia::render('StudentArea/Teacher/All/Index', [
            'search' => $search,
            'services' => $services,
            'serviceCount' => $serviceCount,
        ]);
    }
  

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $teachers = $this->teacherInterface->all();
        return Inertia::render('StudentArea/Service/Create/Index', ['teachers'=> $teachers]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequest $request)
    {
        $this->serviceInterface->create($request->all());
        return redirect()->route('services.index');
        
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        $service = $this->serviceInterface->findById($service->id, ['*'], ['teacher.user']);
        
        return Inertia::render('StudentArea/Service/Show/Index', ['service' => $service]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        
        return Inertia::render('Services/Edit/Index', ['service' => $service]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, Service $service)
    {
        
        $this->serviceInterface->update($service->id, $request->all());
        return redirect()->route('services.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        $this->serviceInterface->deleteById($service->id);
        return redirect()->route('services.index');
    }
}
